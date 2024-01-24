package api

import (
	"strconv"

	"dario.cat/mergo"
	"github.com/gofiber/fiber/v2"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"github.com/mattrybin/PeacefulParenting/backend/types"
)

var (
	questionNotFound         = "Question not found."
	couldNotParseBody        = "Could not parse the body data."
	dbRequestFailed          = "The request to the database failed."
	retrievingResourceFailed = "Successfully created the question, but retrieving resources failed."
)

type QuestionHandler struct {
	questionStore db.QuestionStore
}

func NewQuestionHandler(questionStore db.QuestionStore) *QuestionHandler {
	return &QuestionHandler{
		questionStore: questionStore,
	}
}

func (h *QuestionHandler) GetQuestion(c *fiber.Ctx) error {
	id := c.Params("id")
	question, err := h.questionStore.GetQuestion(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   questionNotFound,
		})
	}
	return c.JSON(question)
}

func (h *QuestionHandler) UpdateQuestion(c *fiber.Ctx) error {
	id := c.Params("id")
	question, err := h.questionStore.GetQuestion(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   questionNotFound,
		})
	}
	var params types.UpdateQuestionParams
	if err := c.BodyParser(&params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   couldNotParseBody,
		})
	}

	newQuestion := types.UpdateQuestionParams{Title: question.Title, Category: question.Category}
	if err := mergo.Merge(&newQuestion, params, mergo.WithOverride); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   couldNotParseBody,
		})
	}

	validate := utils.NewValidator()
	if err := validate.Struct(newQuestion); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"error": true,
			"msg":   utils.ValidatorErrors(err),
		})
	}

	id, err = h.questionStore.UpdateQuestion(id, params)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   dbRequestFailed,
		})
	}

	question, err = h.questionStore.GetQuestion(id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": true,
			"msg":   questionNotFound,
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(question)
}

func (h *QuestionHandler) CreateQuestion(c *fiber.Ctx) error {
	var params types.CreateQuestionParams
	if err := c.BodyParser(&params); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": true,
			"msg":   couldNotParseBody,
		})
	}

	validate := utils.NewValidator()
	if err := validate.Struct(params); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			"error": true,
			"msg":   utils.ValidatorErrors(err),
		})
	}

	id, err := h.questionStore.CreateQuestion(params)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   dbRequestFailed,
		})
	}
	question, err := h.questionStore.GetQuestion(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   retrievingResourceFailed,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(question)
}

// GetListQuestions handles the HTTP request for getting a list of questions.
// @Summary Get a list of questions
// @Description Get a list of questions with optional sorting, range and filtering parameters.
// @Tags Questions
// @Accept  json
// @Produce  json
// @Param sort query string false "Sort key and order ['key','order'] (default is ['id','DESC'])"
// @Param range query string false "Range for pagination [start, end] (default is [75, 99])"
// @Param filter query file false "Filtering by category field {'category':'value'} (default is {})"
// @Success 200 {array} types.Question
// @Header 200 {string} X-Total-Count "Total count of questions"
// @Router /questions [get]
func (h *QuestionHandler) GetListQuestions(c *fiber.Ctx) error {
	sortKey, sortValue := utils.GetSort(c.Query("sort", `["id","DESC"]`))
	limit, offset := utils.GetRange(c.Query("range", `[75, 99]`))
	filter := utils.GetFilter(c.Query("filter", `{}`))
	questions, totalCount, err := h.questionStore.GetListQuestions(sortKey, sortValue, limit, offset, filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": true,
			"msg":   dbRequestFailed,
		})
	}

	if len(questions) == 0 {
		c.Set("X-Total-Count", "0")
		return c.JSON([]types.Question{})
	}

	c.Set("X-Total-Count", strconv.Itoa(totalCount))
	return c.JSON(questions)
}
