package db

import (
	"database/sql"
	"errors"

	"github.com/doug-martin/goqu/v9"
	"github.com/doug-martin/goqu/v9/exp"
	"github.com/mattrybin/PeacefulParenting/backend/internal/utils"
	"github.com/mattrybin/PeacefulParenting/backend/types"
)

type QuestionStore interface {
	GetListQuestions(sortKey string, sortValue string, limit uint, offset uint, filter utils.Filter) ([]types.Question, int, error)
	CreateQuestion(params types.CreateQuestionParams) (string, error)
	GetQuestion(id string) (types.Question, error)
	UpdateQuestion(id string, params types.UpdateQuestionParams) (string, error)
	// DeleteQuestion
}

type PostgresQuestionStore struct {
	client *sql.DB
}

func NewPostgresQuestionStore(client *sql.DB) *PostgresQuestionStore {
	return &PostgresQuestionStore{
		client: client,
	}
}

func (s *PostgresQuestionStore) UpdateQuestion(id string, params types.UpdateQuestionParams) (string, error) {
	updateQuery := goqu.Update("questions").
		Set(goqu.Record{"title": params.Title, "category": params.Category}).
		Where(goqu.C("id").Eq(id))

	sql, _, err := updateQuery.ToSQL()
	if err != nil {
		return "", err
	}

	res, err := s.client.Exec(sql)
	if err != nil {
		return "", err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return "", err
	}

	if rowsAffected == 0 {
		return "", errors.New("no rows updated")
	}

	return id, nil
}

// func (s *PostgresQuestionStore) UpdateQuestion(params types.UpdateQuestionParams) (string, error) {
// 	fmt.Println(params.Title, "hello")
// 	return "awesome", nil
// }

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
	if err = s.client.QueryRow("SELECT COUNT(*) FROM questions").Scan(&totalCount); err != nil {
		panic(err)
	}
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
