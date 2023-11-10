package handlers

import (
	"github.com/gofiber/fiber/v2"
)

type ResponseHTTP struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type ResponseError struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type Data struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

// @Summary Get all questions
// @Description Get all questions
// @Tags Questions
// @Accept json
// @Produce json
// @Success 200 {object} Data
// @Failure 301 {object} ResponseHTTP{}
// @Failure 403 {object} ResponseHTTP{}
// @Failure 404 {object} ResponseHTTP{}
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

// @Summary Get question by ID
// @Description Get question by ID
// @Tags Questions
// @Accept json
// @Produce json
// @Param question_id path int true "Question ID"
// @Success 200 {object} ResponseHTTP{data=[]Data}
// @Failure 503 {object} ResponseHTTP{}
// @Router /v1/questions/{question_id} [get]
func GetQuestionById(c *fiber.Ctx) error {
	data := []Data{
		{"Matt", "Rybin"},
		{"Adam", "Eve"},
	}
	return c.JSON(ResponseHTTP{
		Success: true,
		Message: "Success get question by id.",
		Data:    data,
	})
}

// @Summary Create a new question
// @Description Create question
// @Tags Questions
// @Accept json
// @Produce json
// @Param question body string true "Register book"
// @Success 200 {object} ResponseHTTP{data=[]Data}
// @Failure 400 {object} ResponseHTTP{}
// @Router /v1/questions [post]
func CreateQuestion(c *fiber.Ctx) error {
	data := []Data{
		{"Matt", "Rybin"},
		{"Adam", "Eve"},
	}
	return c.JSON(ResponseHTTP{
		Success: true,
		Message: "Success create question.",
		Data:    data,
	})
}

// @Summary Remove question by ID
// @Description Remove question by ID
// @Tags Questions
// @Accept json
// @Produce json
// @Param question_id path int true "Question ID"
// @Success 200 {object} ResponseHTTP{}
// @Failure 404 {object} ResponseHTTP{}
// @Failure 503 {object} ResponseHTTP{}
// @Router /v1/questions/{question_id} [delete]
func DeleteQuestion(c *fiber.Ctx) error {
	return c.JSON(ResponseHTTP{
		Success: true,
		Message: "Success delete question.",
		Data:    nil,
	})
}
