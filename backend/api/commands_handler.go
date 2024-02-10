package api

import (
	"database/sql"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	_ "github.com/mattrybin/PeacefulParenting/backend/docs"
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

func Migrate(client *sql.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		driver, err := postgres.WithInstance(client, &postgres.Config{})
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to create postgres instance", "detail": err})
		}
		m, err := migrate.NewWithDatabaseInstance(
			"file://scripts/database/migrations",
			"postgres", driver)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to create migration instance", "detail": err})
		}
		err = m.Down()
		if err != nil {
			fmt.Println("Down is not needed to run")
		}
		err = m.Up()

		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Migration Up failed", "detail": err})
		}
		return c.SendStatus(fiber.StatusOK)
	}
}
