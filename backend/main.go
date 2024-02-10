package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	"github.com/mattrybin/PeacefulParenting/backend/api"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	_ "github.com/mattrybin/PeacefulParenting/backend/docs"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

// @title PeacefulParenting API
// @version 1.0
// @description This is an API for PeacefulParenting.ai

// @contact.name Matt Rybin
// @contact.email contact@mattrybin.com

// @BasePath /api
func main() {
	env := utils.SetupEnv()
	client := utils.SetupPostgres(env.PostgresUrl)
	defer client.Close()

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

	questionHandler := api.NewQuestionHandler(db.NewPostgresQuestionStore(client))
	api.SetupRoutes(app, questionHandler, client)

	log.Fatal(app.Listen(":" + env.Port))
}
