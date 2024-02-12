package db

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/doug-martin/goqu/v9"
	"github.com/doug-martin/goqu/v9/exp"
	"github.com/jmoiron/sqlx"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"github.com/mattrybin/PeacefulParenting/backend/types"
)

type QuestionStore interface {
	GetListQuestions(sortKey string, sortValue string, limit uint, offset uint, filter utils.Filter) ([]types.Question, int, error)
	CreateQuestion(params types.CreateQuestionParams) (string, error)
	GetQuestion(id string) (types.Question, error)
	// UpdateQuestion(id string, params types.UpdateQuestionParams) (string, error)
	GetOne(resourceName string, id string, output interface{}) error
	// DeleteQuestion
}

type PostgresQuestionStore struct {
	client *sqlx.DB
}

func NewPostgresQuestionStore(client *sqlx.DB) *PostgresQuestionStore {
	return &PostgresQuestionStore{
		client: client,
	}
}

type GetOneParams struct {
	ID string
}

type GetOneResult struct {
	Row map[string]interface{}
}

func getColumnNamesFromStructTags(i interface{}) []string {
	var t reflect.Type

	// Check if the interface{} is a pointer and get Elem if necessary
	val := reflect.ValueOf(i)
	if val.Kind() == reflect.Ptr {
		t = val.Elem().Type()
	} else {
		t = reflect.TypeOf(i)
	}

	var fieldNames []string
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		dbTag := field.Tag.Get("db")
		if dbTag != "" && dbTag != "-" {
			fieldNames = append(
				fieldNames,
				strings.Split(dbTag, ",")[0], // in case the tags have options such as `db:"col,option"`
			)
		}
	}
	return fieldNames
}

func (s *PostgresQuestionStore) GetOne(resourceName string, id string, dest interface{}) error {
	i := goqu.From(resourceName)
	stringColumns := getColumnNamesFromStructTags(dest)
	columns := make([]interface{}, len(stringColumns))
	for i, v := range stringColumns {
		columns[i] = v
	}
	sql, _, _ := i.Select(columns...).Where(goqu.C("id").Eq(id)).ToSQL()

	err := s.client.Get(dest, sql)
	if err != nil {
		return fmt.Errorf("GetOne error: failed to get resource %s with id %s. %w", resourceName, id, err)
	}
	return nil
}

func (s *PostgresQuestionStore) GetQuestion(id string) (types.Question, error) {
	columns := []interface{}{
		"id",
		"title",
		"category",
		"view_count",
		"vote_count",
		"answer_count",
		"created_at",
	}

	query := goqu.From("questions").Select(columns...).Where(goqu.C("id").Eq(id))
	sql, _, _ := query.ToSQL()
	row := s.client.QueryRow(sql)

	var question types.Question
	if err := row.Scan(&question.Id, &question.Title, &question.Category, &question.ViewCount, &question.VoteCount, &question.AnswerCount, &question.CreatedAt); err != nil {
		return types.Question{}, err
	}

	return question, nil
}

func (s *PostgresQuestionStore) GetListQuestions(sortKey string, sortValue string, limit uint, offset uint, filter utils.Filter) ([]types.Question, int, error) {

	// FIXME Move this to a sort function and pass down the exp instead
	var sort exp.OrderedExpression
	if sortValue == "ASC" {
		sort = goqu.I(sortKey).Asc()
	} else {
		sort = goqu.I(sortKey).Desc()
	}
	columns := []interface{}{
		"id",
		"title",
		"category",
		"view_count",
		"vote_count",
		"answer_count",
		"created_at"}

	query := goqu.From("questions").Select(columns...).Order(sort).Limit(limit).Offset(offset)

	if filter.Category != "" {
		query = query.Where(goqu.I("category").Eq(filter.Category))
	}

	sql, _, _ := query.ToSQL()

	rows, err := s.client.Query(sql)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var questions []types.Question
	for rows.Next() {
		var q types.Question
		if err := rows.Scan(&q.Id, &q.Title, &q.Category, &q.ViewCount, &q.VoteCount, &q.AnswerCount, &q.CreatedAt); err != nil {
			panic(err)
		}
		questions = append(questions, q)

	}
	var totalCount int

	// Prepare base count query.
	countQuery := goqu.From("questions").Select(goqu.COUNT("*"))

	if filter.Category != "" {
		// Add category filter to the count query if category is specified.
		countQuery = countQuery.Where(goqu.I("category").Eq(filter.Category))
	}

	// Convert the count query to SQL query string.
	countSql, _, _ := countQuery.ToSQL()

	// Execute the SQL query and scan the result into the totalCount.
	if err = s.client.QueryRow(countSql).Scan(&totalCount); err != nil {
		panic(err)
	}

	// var totalCount int
	// if err = s.client.QueryRow("SELECT COUNT(*) FROM questions").Scan(&totalCount); err != nil {
	// 	panic(err)
	// }
	return questions, totalCount, err
}

func (s *PostgresQuestionStore) CreateQuestion(params types.CreateQuestionParams) (string, error) {
	ds := goqu.Insert("questions").Rows(
		goqu.Record{"title": params.Title, "category": params.Category},
	).Returning("id")
	insertSQL, _, _ := ds.ToSQL()

	var lastInsertID string
	err := s.client.QueryRow(insertSQL).Scan(&lastInsertID)
	if err != nil {
		return "", err
	}

	return lastInsertID, nil
}
