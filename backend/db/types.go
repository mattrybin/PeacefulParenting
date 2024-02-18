package db

type SortParams struct {
	Field string `json:"field"`
	Order string `json:"order"` // "ASC" or "DESC"
}

type PaginationParams struct {
	Page    uint `json:"page"`
	PerPage uint `json:"perPage"`
}

type GetListParams struct {
	Sort       SortParams       `json:"sort"`
	Pagination PaginationParams `json:"pagination"`
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
