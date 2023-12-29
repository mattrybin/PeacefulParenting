package api

import (
	"fmt"
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
	fmt.Println(newQuestion)
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
