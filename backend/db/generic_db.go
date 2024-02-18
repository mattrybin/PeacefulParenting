package db

import (
	"fmt"
	"reflect"

	"github.com/doug-martin/goqu/v9"
	"github.com/jmoiron/sqlx"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

type GenericDB interface {
	GetOne(resourceName string, id string, output interface{}) (*GetOneResult, error)
	GetList(resourceName string, params GetListParams, dest interface{}) (*GetListResult, error)
}

type PostgresGenericStore struct {
	client *sqlx.DB
}

func NewPostgresGenericStore(client *sqlx.DB) *PostgresGenericStore {
	return &PostgresGenericStore{
		client: client,
	}
}

func (s *PostgresGenericStore) GetOne(resourceName string, id string, dest interface{}) (*GetOneResult, error) {
	i := goqu.From(resourceName)
	stringColumns := utils.GetColumnNamesFromStructTags(dest)
	columns := make([]interface{}, len(stringColumns))
	for i, v := range stringColumns {
		columns[i] = v
	}
	sql, _, _ := i.Select(columns...).Where(goqu.C("id").Eq(id)).ToSQL()

	err := s.client.Get(dest, sql)
	if err != nil {
		return nil, fmt.Errorf("GetOne error: failed to get resource [%s] with id [%s]. %w", resourceName, id, err)
	}

	result := &GetOneResult{
		Data: dest,
	}
	return result, nil
}

func (s *PostgresGenericStore) GetList(resourceName string, params GetListParams, dest interface{}) (*GetListResult, error) {
	singleStruct := reflect.New(reflect.TypeOf(dest).Elem().Elem()).Interface()
	i := goqu.From(resourceName)
	stringColumns := utils.GetColumnNamesFromStructTags(singleStruct)
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
	hasNextPage := uint(total) > uint(offset+limit)
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
