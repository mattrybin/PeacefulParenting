package db

import (
	"fmt"

	"github.com/doug-martin/goqu/v9"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
)

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
