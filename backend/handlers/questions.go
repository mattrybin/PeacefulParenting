package handlers

import (
	"github.com/gofiber/fiber/v2"
)

type ResponseHTTP struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type Data struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

// GetAllBooks is a function to get all questions data from database
// @Summary Get all questions
// @Description Get all questions
// @Tags questions
// @Accept json
// @Produce json
// @Success 200 {object} ResponseHTTP{data=[]Data}
// @Failure 503 {object} ResponseHTTP{}
// @Router /v1/questions [get]
func GetAllQuestions(c *fiber.Ctx) error {
	data := []Data{
		{"Matt", "Rybin"},
		{"Adam", "Eve"},
	}
	return c.JSON(ResponseHTTP{
		Success: true,
		Message: "Success get all questions.",
		Data:    data,
	})
}
