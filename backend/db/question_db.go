package db

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/doug-martin/goqu/v9"
	"github.com/jmoiron/sqlx"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"github.com/mattrybin/PeacefulParenting/backend/types"
)

type GetListParams struct {
	Pagination struct {
		Page    uint `json:"page"`
		PerPage uint `json:"perPage"`
	} `json:"pagination"`
	Sort struct {
		Field string `json:"field"`
		Order string `json:"order"` // "ASC" or "DESC"
	} `json:"sort"`
}
type PageInfo struct {
	HasNextPage     bool `json:"hasNextPage,omitempty"`
	HasPreviousPage bool `json:"hasPreviousPage,omitempty"`
}

type GetListResult struct {
	Data     interface{} `json:"data"`
	Total    int         `json:"total,omitempty"`
	PageInfo *PageInfo   `json:"pageInfo,omitempty"`
}

type GetOneResult struct {
	Data interface{} `json:"data"`
}

type QuestionStore interface {
	GetListQuestions(sortKey string, sortValue string, limit uint, offset uint, filter utils.Filter) ([]types.Question, int, error)
	// CreateQuestion(params types.CreateQuestionParams) (string, error)
	// GetQuestion(id string) (types.Question, error)
	// UpdateQuestion(id string, params types.UpdateQuestionParams) (string, error)
	GetOne(resourceName string, id string, output interface{}) (*GetOneResult, error)
	GetList(resourceName string, params GetListParams, output interface{}) (*GetListResult, error)
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

func (s *PostgresQuestionStore) GetList(resourceName string, params GetListParams, dest interface{}) (*GetListResult, error) {
	singleStruct := reflect.New(reflect.TypeOf(dest).Elem().Elem()).Interface()
	i := goqu.From(resourceName)
	stringColumns := getColumnNamesFromStructTags(singleStruct)
	columns := make([]interface{}, len(stringColumns))
	for i, v := range stringColumns {
		columns[i] = v
	}

	dataset := i.Select(columns...)
	if params.Sort.Field != "" {
		if params.Sort.Order == "DESC" {
			dataset = dataset.Order(goqu.I(params.Sort.Field).Desc())
		} else {
			dataset = dataset.Order(goqu.I(params.Sort.Field).Asc())
		}
	}

	// Consider page and perPage as 1 indexed
	offset := (params.Pagination.Page - 1) * params.Pagination.PerPage
	limit := params.Pagination.PerPage

	dataset = dataset.Offset(uint(offset)).Limit(uint(limit))

	sql, _, _ := dataset.ToSQL()

	err := s.client.Select(dest, sql)
	if err != nil {
		return nil, fmt.Errorf("GetList error: failed to get resources from %s. %w", resourceName, err)
	}

	// Find total rows
	var total int
	err = s.client.Get(&total, fmt.Sprintf("SELECT COUNT(*) FROM %s", resourceName))
	if err != nil {
		return nil, fmt.Errorf("GetList error: failed to get count of resources from %s. %w", resourceName, err)
	}

	// Determine if we have a next or a previous page
	hasNextPage := uint(total) > offset+limit
	hasPreviousPage := offset > 0

	result := &GetListResult{
		Data:  dest,
		Total: total,
		PageInfo: &PageInfo{
			HasNextPage:     hasNextPage,
			HasPreviousPage: hasPreviousPage,
		},
	}

	return result, nil
}

func (s *PostgresQuestionStore) GetOne(resourceName string, id string, dest interface{}) (*GetOneResult, error) {
	i := goqu.From(resourceName)
	stringColumns := getColumnNamesFromStructTags(dest)
	columns := make([]interface{}, len(stringColumns))
	for i, v := range stringColumns {
		columns[i] = v
	}
	sql, _, _ := i.Select(columns...).Where(goqu.C("id").Eq(id)).ToSQL()

	err := s.client.Get(dest, sql)
	if err != nil {
		return nil, fmt.Errorf("GetOne error: failed to get resource %s with id %s. %w", resourceName, id, err)
	}

	result := &GetOneResult{
		Data: dest,
	}
	return result, nil
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
