package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
	_ "github.com/mattrybin/PeacefulParenting/backend/docs"
	"github.com/mattrybin/PeacefulParenting/backend/handlers"
)

// @title PeacefulParenting API
// @version 1.0
// @description This is an API for PeacefulParenting.ai

// @contact.name Matt Rybin
// @contact.email contact@mattrybin.com

// @BasePath /api
func main() {
	app := fiber.New()
	app.Get("/docs/*", swagger.HandlerDefault)

	api := app.Group("/api")
	v1 := api.Group("/v1", func(c *fiber.Ctx) error {
		c.JSON(fiber.Map{
			"message": "🐣 v1",
		})
		return c.Next()
	})

	v1.Get("/questions", handlers.GetAllQuestions)
	v1.Get("/questions/:question_id", handlers.GetQuestionById)
	v1.Post("/questions", handlers.CreateQuestion)
	v1.Delete("/questions/:question_id", handlers.DeleteQuestion)
	log.Fatal(app.Listen(":3100"))
}
