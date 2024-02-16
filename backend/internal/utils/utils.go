package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"unicode"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func Json(input interface{}) *bytes.Reader {
	b, _ := json.Marshal(input)
	return bytes.NewReader(b)
}

func GetColumnNamesFromStructTags(i interface{}) []string {
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

//	func ErrorMessage(c *fiber.Ctx, status int, msg string) error {
//		return c.Status(status).JSON(fiber.Map{
//			"error": true,
//			"msg":   msg,
//		})
//	}
func ErrorMessage(c *fiber.Ctx, status int, msg interface{}) error {
	return c.Status(status).JSON(fiber.Map{
		"error": true,
		"msg":   msg,
	})
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

func SetupPostgres(env *EnvVars) *sqlx.DB {
	fmt.Print(env.PostgresUrl)
	db, err := sqlx.Connect("postgres", env.PostgresUrl)
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
