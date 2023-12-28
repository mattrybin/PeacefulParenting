package utils

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"
	"unicode"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "postgres"
)

func Json(input interface{}) *bytes.Reader {
	b, _ := json.Marshal(input)
	return bytes.NewReader(b)
}

func NewTestRequest(method string, url string, body *bytes.Reader) *http.Request {
	if body != nil {
		req := httptest.NewRequest(method, url, body)
		req.Header.Add("Content-Type", "application/json")
		return req
	} else {
		req := httptest.NewRequest(method, url, nil)
		req.Header.Add("Content-Type", "application/json")
		return req
	}
}

func SetupPostgres() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Failed to connect to database, error: %s", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping to database, error: %s", err)
	}
	return db
}

func CamelToSnake(s string) string {
	var result string
	var words []string
	v := []rune(s)

	for i := 0; i < len(v); i++ {
		if i > 0 && unicode.IsUpper(v[i]) {
			words = append(words, result)
			result = ""
		}
		result += string(unicode.ToLower(v[i]))
	}
	words = append(words, result)

	return strings.Join(words, "_")
}

func GetSort(param string) (string, string) {
	defaultParams := []string{"id", "DESC"}
	var sortParams []string
	err := json.Unmarshal([]byte(param), &sortParams)

	if err != nil {
		sortParams = defaultParams
	}
	return CamelToSnake(sortParams[0]), sortParams[1]
}

type Filter struct {
	Category string `json:"category"`
}

func GetFilter(param string) (filterParams Filter) {
	err := json.Unmarshal([]byte(param), &filterParams)
	if err != nil {
		filterParams = Filter{""}
	}
	return filterParams
}

func GetRange(param string) (uint, uint) {
	defaultParams := []int{0, 9}
	var rangeParams []int
	err := json.Unmarshal([]byte(param), &rangeParams)

	if err != nil {
		rangeParams = defaultParams
	}
	return uint(rangeParams[1] - rangeParams[0] + 1), uint(rangeParams[0])
}
