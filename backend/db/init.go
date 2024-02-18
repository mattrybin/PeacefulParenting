package db

import (
	"github.com/jmoiron/sqlx"
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
