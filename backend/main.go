package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	_ "github.com/lib/pq"
	"github.com/mattrybin/PeacefulParenting/backend/api"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	_ "github.com/mattrybin/PeacefulParenting/backend/docs"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

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
	port := flag.String("port", "4100", "The port number")
	client := utils.SetupPostgres()
	defer client.Close()

	// api := api.Handler{
	// 	DB: db,
	// }

	questionHandler := api.NewQuestionHandler(db.NewPostgresQuestionStore(client))

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,DELETE,PATCH",
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

	v1.Get("/questions", questionHandler.GetListQuestions)
	v1.Post("/questions", questionHandler.CreateQuestion)
	// v1.Get("/questions/:id", api.GetOneQuestion)
	// v1.Post("/questions", handlers.CreateQuestion)
	// v1.Delete("/questions/:question_id", handlers.DeleteQuestion)
	url := fmt.Sprintf(":%s", *port)
	log.Fatal(app.Listen(url))
}
