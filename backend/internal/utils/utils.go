package utils

import (
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
