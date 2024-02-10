package api

import (
	"database/sql"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

func HealthCheck() func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status": "ok",
		})
	}
}

func SetupRoutes(app *fiber.App, questionHandler *QuestionHandler, client *sql.DB) {
	app.Get("/docs/*", swagger.HandlerDefault)
	app.Get("/healthcheck", HealthCheck())
	app.Get("/commands/seed", Seed(client))
	app.Get("/commands/migrate", Migrate(client))

	v1 := app.Group("api/v1")

	v1.Get("/questions", questionHandler.GetListQuestions)
	v1.Post("/questions", questionHandler.CreateQuestion)
	v1.Get("/questions/:id", questionHandler.GetQuestion)
	v1.Put("/questions/:id", questionHandler.UpdateQuestion)
}
