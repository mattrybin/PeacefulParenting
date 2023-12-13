package utils

import (
	"encoding/json"
	"strconv"
	"strings"
	"unicode"
)

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

func GetSort(param string) []string {
	defaultParams := []string{"id", "DESC"}
	var sortParams []string
	err := json.Unmarshal([]byte(param), &sortParams)

	if err != nil {
		sortParams = defaultParams
	}
	return sortParams
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

func GetRange(param string) (string, string) {
	defaultParams := []int{0, 9}
	var rangeParams []int
	err := json.Unmarshal([]byte(param), &rangeParams)

	if err != nil {
		rangeParams = defaultParams
	}
	return strconv.Itoa(rangeParams[1] - rangeParams[0] + 1), strconv.Itoa(rangeParams[0])
}
