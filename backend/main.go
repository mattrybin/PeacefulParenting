package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	_ "github.com/lib/pq"
	_ "github.com/mattrybin/PeacefulParenting/backend/docs"
	"github.com/mattrybin/PeacefulParenting/backend/handlers"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "postgres"
)

func setupPostgres() *sql.DB {
	fmt.Print("AWESOME")
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Failed to connect to database, error: %s", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping to database, error: %s", err)
	}

	log.Println("Successfully connected to database!")
	return db
}

// @title PeacefulParenting API
// @version 1.0
// @description This is an API for PeacefulParenting.ai

// @contact.name Matt Rybin
// @contact.email contact@mattrybin.com

// @BasePath /api
func main() {
	db := setupPostgres()
	defer db.Close()

	handlers := handlers.Handler{
		DB: db,
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "*",
		AllowHeaders:     "X-Total-Count",
		ExposeHeaders:    "X-Total-Count",
	}))

	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Expose-Headers", "X-Total-Count")
		c.Set("Content-Type", "application/json")
		return c.Next()
	})
	app.Use(logger.New())

	app.Get("/docs/*", swagger.HandlerDefault)

	api := app.Group("/api")
	v1 := api.Group("/v1", func(c *fiber.Ctx) error {
		c.JSON(fiber.Map{
			"message": "🐣 v1",
		})
		return c.Next()
	})

	v1.Get("/questions", handlers.GetListQuestions)
	v1.Get("/questions/:id", handlers.GetOneQuestion)
	// v1.Post("/questions", handlers.CreateQuestion)
	// v1.Delete("/questions/:question_id", handlers.DeleteQuestion)
	log.Fatal(app.Listen(":4100"))
}
