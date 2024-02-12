package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
	"github.com/jmoiron/sqlx"
)

func HealthCheck() func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
		})
	}
}

func SetupRoutes(app *fiber.App, questionHandler *QuestionHandler, client *sqlx.DB) {
	app.Get("/docs/*", swagger.HandlerDefault)
	app.Get("/healthcheck", HealthCheck())
	app.Get("/commands/seed", Seed(client))
	app.Get("/commands/migrate", Migrate(client))

	// questions := app.Group("api/v1/questions")

	// questions.Get("/", questionHandler.GetListQuestions)
	// v1.Post("/questions", questionHandler.CreateQuestion)
	// questions.Get("/questions/:id", questionHandler.GetQuestion)
	// v1.Put("/questions/:id", questionHandler.UpdateQuestion)
}
