package main

import (
	"context"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	"github.com/jmoiron/sqlx"
	"github.com/mattrybin/PeacefulParenting/backend/api"
	generic_handler "github.com/mattrybin/PeacefulParenting/backend/api/generic"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"github.com/mattrybin/PeacefulParenting/backend/types"
	"go.uber.org/fx"
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
	fmt.Println("HELLO WORLD")
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
		fmt.Println("Can't migrate down")
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
// @schemes http https
// @BasePath /api/v1
// @contact.name Matt Rybin
// @contact.email contact@mattrybin.com
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
	app.Get("/healthcheck", api.HealthCheck())
	app.Get("/commands/seed", api.Seed(client))
	app.Get("/commands/migrate", api.Migrate(client))

	questionHandler := generic_handler.NewGenericHandler("posts", db.NewPostgresGenericStore(client))
	questions := app.Group("api/v1/questions")
	questions.Get("/", func(c *fiber.Ctx) error {
		questions := []types.Question{}
		return questionHandler.GetList(c, &questions)
	})

	questions.Get("/:id", func(c *fiber.Ctx) error {
		question := types.Question{}
		return questionHandler.GetOne(c, &question)
	})

	lc.Append(fx.Hook{
		OnStart: func(context.Context) error {
			fmt.Printf("\nStarting fiber server on port %v\n\n", env.Port)
			go app.Listen(":" + env.Port)
			return nil
		},
		OnStop: func(ctx context.Context) error {
			return app.Shutdown()
		},
	})
	return app
}

// @title PeacefulParenting API
// @version 1.0
// @description This is an API for PeacefulParenting.ai

	// app.Get("/commands/seed", func(c *fiber.Ctx) error {
	// 	err := database.SeedDB(client)
	// 	if err != nil {
	// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error seeding database", "error": err.Error()})
	// 	}
	// 	return c.JSON(fiber.Map{"message": "Seeding done!"})
	// })

	app.Get("/commands/seed", Seed(client))
	// app.Get("/commands/seed", Seed(c, client))

// @BasePath /api
func main() {
	fx.New(
		fx.Provide(
			utils.SetupEnv,
			utils.SetupPostgres,
		),
		fx.Invoke(newFiberServer),
	).Run()
}
