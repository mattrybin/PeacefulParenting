package main

import "github.com/gofiber/fiber/v2"

type Data struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

func main() {
	app := fiber.New()
	app.Get("/api/v1/questions", func(c *fiber.Ctx) error {
		data := []Data{
			{"Matt", "Rybin"},
			{"Adam", "Eve"},
		}
		return c.JSON(data)
	})
	app.Listen(":3100")
}
