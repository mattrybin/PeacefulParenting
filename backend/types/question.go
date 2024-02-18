package types

import "time"

type CreateQuestionParams struct {
	Title    string `json:"title" validate:"required,min=1"`
	Category string `json:"category,omitempty" validate:"omitempty,oneof=child toddler preteen infant teen adult household relatives other"`
}

type UpdateQuestionParams struct {
	Title    string `json:"title,omitempty" validate:"omitempty,min=1"`
	Category string `json:"category,omitempty" validate:"omitempty,oneof=child toddler preteen infant teen adult household relatives other"`
}

type Question struct {
	Id          string    `json:"id" db:"id"`
	Title       string    `json:"title" db:"title"`
	Body        string    `json:"body" db:"body"`
	Category    string    `json:"category" db:"category" validate:"oneof=child toddler preteen infant teen adult household relatives other"`
	ViewCount   int       `json:"viewCount" db:"view_count"`
	VoteCount   int       `json:"voteCount" db:"vote_count"`
	AnswerCount int       `json:"answerCount" db:"answer_count"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
}

func NewQuestionFormParams(params CreateQuestionParams) (*Question, error) {
	return &Question{
		Title:    params.Title,
		Category: params.Category,
	}, nil
}
