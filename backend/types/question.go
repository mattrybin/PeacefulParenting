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
	Id          string    `json:"id"`
	Title       string    `json:"title"`
	Category    string    `json:"category" validate:"oneof=child toddler preteen infant teen adult household relatives other"`
	ViewCount   int       `json:"viewCount"`
	VoteCount   int       `json:"voteCount"`
	AnswerCount int       `json:"answerCount"`
	CreatedAt   time.Time `json:"createdAt"`
}

func NewQuestionFormParams(params CreateQuestionParams) (*Question, error) {
	return &Question{
		Title:    params.Title,
		Category: params.Category,
	}, nil
}
