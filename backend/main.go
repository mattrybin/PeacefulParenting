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
	"github.com/mattrybin/PeacefulParenting/backend/db"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"go.uber.org/fx"
)

func newFiberServer(lc fx.Lifecycle, env *utils.EnvVars, client *sqlx.DB) *fiber.App {
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

	questionHandler := api.NewQuestionHandler(db.NewPostgresQuestionStore(client))
	questions := app.Group("api/v1/questions")
	questions.Get("/:id", questionHandler.GetQuestion)

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

// @contact.name Matt Rybin
// @contact.email contact@mattrybin.com

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
