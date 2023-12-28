package api

import (
	"database/sql"
	"fmt"
	"net/http"
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"github.com/mattrybin/PeacefulParenting/backend/db"
	"github.com/mattrybin/PeacefulParenting/backend/internal/test"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"github.com/mattrybin/PeacefulParenting/backend/types"
)

func (suite *QuestionsHandlerSuite) TestUpdateQuestion400() {
	request := utils.NewTestRequest("GET", "/questions", nil)
	response, _ := suite.app.Test(request)
	list, _ := test.ParseJson[[]types.Question](response)

	request = utils.NewTestRequest("PATCH", fmt.Sprintf("/questions/%s", list[0].Id), nil)
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusBadRequest, response.StatusCode)
}

func (suite *QuestionsHandlerSuite) TestUpdateQuestion200() {
	request := utils.NewTestRequest("GET", "/questions", nil)
	response, _ := suite.app.Test(request)
	list, _ := test.ParseJson[[]types.Question](response)

	params := types.UpdateQuestionParams{
		Title: "1111",
	}
	request = utils.NewTestRequest("PATCH", fmt.Sprintf("/questions/%s", list[0].Id), utils.Json(params))
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusAccepted, response.StatusCode)
}

func (suite *QuestionsHandlerSuite) TestCreateQuestion400() {
	request := utils.NewTestRequest("POST", "/questions", nil)
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusBadRequest, response.StatusCode)
}

func (suite *QuestionsHandlerSuite) TestCreateQuestion422() {
	params := types.CreateQuestionParams{
		Category: "child",
	}
	request := utils.NewTestRequest("POST", "/questions", utils.Json(params))
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusUnprocessableEntity, response.StatusCode)
}

func (suite *QuestionsHandlerSuite) TestCreateQuestion201() {
	params := types.CreateQuestionParams{
		Title:    "works",
		Category: "child",
	}

	request := utils.NewTestRequest("POST", "/questions", utils.Json(params))
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusCreated, response.StatusCode)
}

func (suite *QuestionsHandlerSuite) TestGetListQuestions204() {
	request := utils.NewTestRequest("GET", "/questions", nil)
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusOK, response.StatusCode)

	list, err := test.ParseJson[[]types.Question](response)
	suite.NoError(err)
	suite.Assert().NotNil(list[0].Id)
}

func (suite *QuestionsHandlerSuite) TestGetListQuestions200() {
	request := utils.NewTestRequest("GET", "/questions", nil)
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusOK, response.StatusCode)

	list, err := test.ParseJson[[]types.Question](response)
	suite.NoError(err)
	suite.Assert().NotNil(list[0].Id)
}

func (suite *QuestionsHandlerSuite) TestGetQuestion404() {
	request := utils.NewTestRequest("GET", "/questions/not-existing", nil)
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusNotFound, response.StatusCode)
}

func (suite *QuestionsHandlerSuite) TestGetQuestion200() {
	request := utils.NewTestRequest("GET", "/questions", nil)
	response, _ := suite.app.Test(request)
	list, _ := test.ParseJson[[]types.Question](response)

	request = utils.NewTestRequest("GET", fmt.Sprintf("/questions/%s", list[0].Id), nil)
	response, err := suite.app.Test(request)
	suite.NoError(err)
	suite.Equal(http.StatusOK, response.StatusCode)

	single, err := test.ParseJson[types.Question](response)
	suite.NoError(err)
	suite.Assert().NotNil(single.Id)
}

type QuestionsHandlerSuite struct {
	suite.Suite
	databaseClient *sql.DB
	handler        *QuestionHandler
	app            *fiber.App
}

func (suite *QuestionsHandlerSuite) SetupTest() {
	suite.databaseClient = utils.SetupPostgres()
	suite.handler = NewQuestionHandler(db.NewPostgresQuestionStore(suite.databaseClient))
	suite.app = fiber.New()
	suite.app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Expose-Headers", "X-Total-Count")
		c.Set("Content-Type", "application/json")
		return c.Next()
	})
	suite.app.Get("/questions", suite.handler.GetListQuestions)
	suite.app.Get("/questions/:id", suite.handler.GetQuestion)
	suite.app.Patch("/questions/:id", suite.handler.UpdateQuestion)
	suite.app.Post("/questions", suite.handler.CreateQuestion)
}

func (suite *QuestionsHandlerSuite) AfterTest() {
	suite.databaseClient.Close()
}

func TestQuestionHandler(t *testing.T) {
	suite.Run(t, new(QuestionsHandlerSuite))
}
