package handlers

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Post struct {
	Id          string    `json:"id"`
	Title       string    `json:"title"`
	Category    string    `json:"category"`
	ViewCount   int       `json:"viewCount"`
	VoteCount   int       `json:"voteCount"`
	AnswerCount int       `json:"answerCount"`
	CreateAt    time.Time `json:"createAt"`
}

type Handler struct {
	DB *sql.DB
}

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
// @Success 200 {object} Post
// @Failure 301 {object} ResponseHTTP{}
// @Failure 403 {object} ResponseHTTP{}
// @Failure 404 {object} ResponseHTTP{}
// @Router /v1/questions [get]
func (h *Handler) GetAllQuestions(c *fiber.Ctx) error {
	rows, err := h.DB.Query("SELECT id, title, category, view_count, vote_count, answer_count, created_at FROM posts")
	if err != nil {
		// Returns a 500 error if something goes wrong
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var q Post
		if err := rows.Scan(&q.Id, &q.Title, &q.Category, &q.ViewCount, &q.VoteCount, &q.AnswerCount, &q.CreateAt); err != nil {
			// Returns a 500 error if something goes wrong
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}

		c.Set("ngrok-skip-browser-warning", "69420")
		posts = append(posts, q)
		fmt.Println(posts)
	}

	return c.JSON(posts)
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
func (h *Handler) GetQuestionById(c *fiber.Ctx) error {
	data := []Data{
		{"Matt", "Rybin"},
		{"Adam", "Eve"},
	}
	return c.JSON(data)
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
func (h *Handler) CreateQuestion(c *fiber.Ctx) error {
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
func (h *Handler) DeleteQuestion(c *fiber.Ctx) error {
	return c.JSON(ResponseHTTP{
		Success: true,
		Message: "Success delete question.",
		Data:    nil,
	})
}
