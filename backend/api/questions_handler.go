package api

import (
	"database/sql"
	"errors"

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

type GetOneResult struct {
	Data interface{} `json:"data"`
}

func (h *QuestionHandler) GetQuestion(c *fiber.Ctx) error {
	id := c.Params("id")

	question := types.Question{}
	result, err := h.questionStore.GetOne("questions", id, &question)
	if errors.Is(err, sql.ErrNoRows) {
		return utils.ErrorMessage(c, fiber.StatusNotFound, questionNotFound)
	} else if err != nil {
		return utils.ErrorMessage(c, fiber.StatusInternalServerError, err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(result)
}

// func (h *QuestionHandler) UpdateQuestion(c *fiber.Ctx) error {
// 	id := c.Params("id")

// 	question, err := h.questionStore.GetQuestion(id)
// 	if err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusNotFound, questionNotFound)
// 	}

// 	var params types.UpdateQuestionParams
// 	if err := c.BodyParser(&params); err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusBadRequest, couldNotParseBody)
// 	}

// 	newQuestion := types.UpdateQuestionParams{Title: question.Title, Category: question.Category}
// 	if err := mergo.Merge(&newQuestion, params, mergo.WithOverride); err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusBadRequest, couldNotParseBody)
// 	}

// 	validate := utils.NewValidator()
// 	if err := validate.Struct(newQuestion); err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusUnprocessableEntity, utils.ValidatorErrors(err))
// 	}

// 	id, err = h.questionStore.UpdateQuestion(id, params)
// 	if err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusInternalServerError, dbRequestFailed)
// 	}

// 	question, err = h.questionStore.GetQuestion(id)
// 	if err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusNotFound, questionNotFound)
// 	}

// 	return c.Status(fiber.StatusAccepted).JSON(question)
// }

// func (h *QuestionHandler) CreateQuestion(c *fiber.Ctx) error {
// 	var params types.CreateQuestionParams
// 	if err := c.BodyParser(&params); err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusBadRequest, couldNotParseBody)
// 	}

// 	validate := utils.NewValidator()
// 	if err := validate.Struct(params); err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusUnprocessableEntity, utils.ValidatorErrors(err))
// 	}

// 	id, err := h.questionStore.CreateQuestion(params)
// 	if err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusInternalServerError, dbRequestFailed)
// 	}
// 	question, err := h.questionStore.GetQuestion(id)
// 	if err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusInternalServerError, retrievingResourceFailed)
// 	}
// 	return c.Status(fiber.StatusCreated).JSON(question)
// }

// func (h *QuestionHandler) GetListQuestions(c *fiber.Ctx) error {
// 	sortKey, sortValue := utils.GetSort(c.Query("sort", `["id","DESC"]`))
// 	limit, offset := utils.GetRange(c.Query("range", `[75, 99]`))
// 	filter := utils.GetFilter(c.Query("filter", `{}`))

// 	// params := db.GetOneParams{
// 	// 	ID: "013bcd73-17c6-4127-a609-0369342f3dec",
// 	// 	Meta: map[string]interface{}{
// 	// 		"columns": []string{"id", "title"},
// 	// 	},
// 	// }

// 	// result, err := h.questionStore.GetOne("questions", params)
// 	// if err != nil {
// 	// Handle error
// 	// }
// 	// fmt.Println("AWESOME")
// 	// fmt.Println(result)

// 	questions, totalCount, err := h.questionStore.GetListQuestions(sortKey, sortValue, limit, offset, filter)
// 	if err != nil {
// 		return utils.ErrorMessage(c, fiber.StatusInternalServerError, dbRequestFailed)
// 	}

// 	if len(questions) == 0 {
// 		c.Set("X-Total-Count", "0")
// 		return c.JSON([]types.Question{})
// 	}

// 	c.Set("X-Total-Count", strconv.Itoa(totalCount))
// 	return c.JSON(questions)
// }

func (h *QuestionHandler) GetListQuestions(c *fiber.Ctx) error {
	sortKey, sortValue := utils.GetSort(c.Query("sort", `["id","DESC"]`))
	limit, offset := utils.GetRange(c.Query("range", `[75, 99]`))
	params := db.GetListParams{
		Pagination: struct {
			Page    uint `json:"page"`
			PerPage uint `json:"perPage"`
		}{
			Page:    uint(offset/limit) + 1, // Converting the range values to 1-indexed page and perPage values
			PerPage: uint(limit),
		},
		Sort: struct {
			Field string `json:"field"`
			Order string `json:"order"`
		}{
			Field: sortKey,
			Order: sortValue,
		},
	}
	var questions []types.Question
	result, err := h.questionStore.GetList("questions", params, &questions)
	if err != nil {
		// Adjust error handling as you need
		if errors.Is(err, sql.ErrNoRows) {
			return utils.ErrorMessage(c, fiber.StatusNotFound, questionNotFound)
		}
		return utils.ErrorMessage(c, fiber.StatusInternalServerError, err.Error())
	}
	return c.JSON(result)
}
