package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

type Question struct {
	Id          string    `json:"id"`
	Title       string    `json:"title"`
	Category    string    `json:"category"`
	ViewCount   int       `json:"viewCount"`
	VoteCount   int       `json:"voteCount"`
	AnswerCount int       `json:"answerCount"`
	CreatedAt   time.Time `json:"createdAt"`
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
// @Success 200 {object} Question
// @Failure 301 {object} ResponseHTTP{}
// @Failure 403 {object} ResponseHTTP{}
// @Failure 404 {object} ResponseHTTP{}
// @Router /v1/questions [get]
func (h *Handler) GetListQuestions(c *fiber.Ctx) error {
	var totalCount int
	sort := utils.GetSort(c.Query("sort", `["id","DESC"]`))
	limit, offset := utils.GetRange(c.Query("range", `[75, 99]`))
	filter := utils.GetFilter(c.Query("filter", `{}`))

	baseQuery := "FROM questions"

	if filter.Category != "" {
		baseQuery += fmt.Sprintf(" WHERE category = '%s'", filter.Category)
	}

	query := fmt.Sprintf("SELECT id, title, category, view_count, vote_count, answer_count, created_at %s ORDER BY %s %s LIMIT %s OFFSET %s", baseQuery, utils.CamelToSnake(sort[0]), sort[1], limit, offset)

	rows, err := h.DB.Query(query)
	if err != nil {
		return fiber.ErrServiceUnavailable
	}
	defer rows.Close()

	countQuery := fmt.Sprintf("SELECT COUNT(*) %s", baseQuery)
	err = h.DB.QueryRow(countQuery).Scan(&totalCount)
	if err != nil {
		return fiber.ErrServiceUnavailable
	}

	var questions []Question
	for rows.Next() {
		var q Question
		if err := rows.Scan(&q.Id, &q.Title, &q.Category, &q.ViewCount, &q.VoteCount, &q.AnswerCount, &q.CreatedAt); err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}

		questions = append(questions, q)
	}

	if len(questions) == 0 {
		c.Set("X-Total-Count", "0")
		return c.JSON([]Question{})
	}
	c.Set("X-Total-Count", strconv.Itoa(totalCount))
	return c.JSON(questions)
}

// @Summary Get question by ID
// @Description Get question by ID
// @Tags Questions
// @Accept json
// @Produce json
// @Param question_id path int true "Question ID"
// @Success 200 {object} ResponseHTTP{data=[]Data}
// @Failure 503 {object} ResponseHTTP{}
// @Router /v1/questions/{id} [get]
func (h *Handler) GetOneQuestion(c *fiber.Ctx) error {
	fmt.Println("HELLO")
	id := c.Params("id")
	log.Println("This is a log message")

	query := fmt.Sprintf("SELECT id, title, category, view_count, vote_count, answer_count, created_at FROM questions WHERE id = '%s'", id)
	row := h.DB.QueryRow(query)
	var question Question // assuming Question is your model
	err := row.Scan(&question.Id, &question.Title, &question.Category, &question.ViewCount, &question.VoteCount, &question.AnswerCount, &question.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			// No result
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "No question found with given id",
			})
		}
		// DB error
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(question)
}

// // @Summary Create a new question
// // @Description Create question
// // @Tags Questions
// // @Accept json
// // @Produce json
// // @Param question body string true "Register book"
// // @Success 200 {object} ResponseHTTP{data=[]Data}
// // @Failure 400 {object} ResponseHTTP{}
// // @Router /v1/questions [post]
// func (h *Handler) CreateQuestion(c *fiber.Ctx) error {
// 	data := []Data{
// 		{"Matt", "Rybin"},
// 		{"Adam", "Eve"},
// 	}
// 	return c.JSON(ResponseHTTP{
// 		Success: true,
// 		Message: "Success create question.",
// 		Data:    data,
// 	})
// }

// // @Summary Remove question by ID
// // @Description Remove question by ID
// // @Tags Questions
// // @Accept json
// // @Produce json
// // @Param question_id path int true "Question ID"
// // @Success 200 {object} ResponseHTTP{}
// // @Failure 404 {object} ResponseHTTP{}
// // @Failure 503 {object} ResponseHTTP{}
// // @Router /v1/questions/{question_id} [delete]
// func (h *Handler) DeleteQuestion(c *fiber.Ctx) error {
// 	return c.JSON(ResponseHTTP{
// 		Success: true,
// 		Message: "Success delete question.",
// 		Data:    nil,
// 	})
// }
