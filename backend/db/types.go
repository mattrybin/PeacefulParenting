package db

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
