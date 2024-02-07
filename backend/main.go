package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	"github.com/mattrybin/PeacefulParenting/backend/api"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	_ "github.com/mattrybin/PeacefulParenting/backend/docs"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"github.com/mattrybin/PeacefulParenting/backend/scripts/database"
)

func Seed(client *sql.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		err := database.SeedDB(client)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error seeding database",
				"error":   err.Error(),
			})
		}
		return c.JSON(fiber.Map{"message": "Seeding done!"})
	}
}

func RunMigrations(db *sql.DB) error {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return err
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://scripts/database/migrations",
		"postgres", driver)
	if err != nil {
		return err
	}
	err = m.Down()
	if err != nil {
		return err
	}
	err = m.Up()
	return err
}

type (
	CreateQuestionParams struct {
		Title    string `json:"title" validate:"required"`
		Category string `json:"category" validate:"required"`
	}

	ErrorResponse struct {
		Error       bool
		FailedField string
		Tag         string
		Value       interface{}
	}

	XValidator struct {
		validator *validator.Validate
	}

	GlobalErrorHandlerResp struct {
		Success bool   `json:"success"`
		Message string `json:"message"`
	}
)

var validate = validator.New()

func (v XValidator) Validate(data interface{}) []ErrorResponse {
	validationErrors := []ErrorResponse{}

	errs := validate.Struct(data)
	if errs != nil {
		for _, err := range errs.(validator.ValidationErrors) {
			// In this case data object is actually holding the User struct
			var elem ErrorResponse

			elem.FailedField = err.Field() // Export struct field name
			elem.Tag = err.Tag()           // Export struct tag
			elem.Value = err.Value()       // Export field value
			elem.Error = true

			validationErrors = append(validationErrors, elem)
		}
	}

	return validationErrors
}

// @title PeacefulParenting API
// @version 1.0
// @description This is an API for PeacefulParenting.ai

// @contact.name Matt Rybin
// @contact.email contact@mattrybin.com

// @BasePath /api
func main() {
	url := os.Getenv("POSTGRES_URL")
	if url == "" {
		url = "host=db port=5432 user=postgres password=password dbname=pp-db-development sslmode=disable" // default value
	}
	client := utils.SetupPostgres(url)
	defer client.Close()

	questionHandler := api.NewQuestionHandler(db.NewPostgresQuestionStore(client))

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,DELETE,PATCH,PUT",
		AllowHeaders:     "X-Total-Count,content-type",
		ExposeHeaders:    "X-Total-Count",
	}))

	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Expose-Headers", "X-Total-Count")
		c.Set("Content-Type", "application/json")
		return c.Next()
	})
	app.Use(logger.New())

	app.Get("/docs/*", swagger.HandlerDefault)

	v1 := app.Group("api/v1", func(c *fiber.Ctx) error {
		c.JSON(fiber.Map{
			"message": "🐣 v1",
		})
		return c.Next()
	})

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
		})
	})

	app.Get("/commands/migrate", func(c *fiber.Ctx) error {
		err := RunMigrations(client)
		if err != nil {
			fmt.Println(err)
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		return c.SendStatus(fiber.StatusOK)
	})

	// app.Get("/commands/seed", func(c *fiber.Ctx) error {
	// 	err := database.SeedDB(client)
	// 	if err != nil {
	// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error seeding database", "error": err.Error()})
	// 	}
	// 	return c.JSON(fiber.Map{"message": "Seeding done!"})
	// })

	app.Get("/commands/seed", Seed(client))
	// app.Get("/commands/seed", Seed(c, client))

	v1.Get("/questions", questionHandler.GetListQuestions)
	v1.Post("/questions", questionHandler.CreateQuestion)
	v1.Get("/questions/:id", questionHandler.GetQuestion)
	v1.Put("/questions/:id", questionHandler.UpdateQuestion)
	// v1.Delete("/questions/:question_id", handlers.DeleteQuestion)
	port := os.Getenv("PORT")
	if port == "" {
		port = "4100" // default port
	}
	url = fmt.Sprintf(":%s", port)
	log.Fatal(app.Listen(url))
}
