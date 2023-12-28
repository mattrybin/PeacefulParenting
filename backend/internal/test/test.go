package test

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httputil"
)

func DumpResponse(response *http.Response) {
	dump, err := httputil.DumpResponse(response, true)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", dump)
}

func ParseJson[T any](response *http.Response) (T, error) {
	bodyBytes, err := io.ReadAll(response.Body)
	if err != nil {
		panic(err)
	}
	response.Body.Close()

	var objs T
	err = json.Unmarshal(bodyBytes, &objs)

	return objs, err
}
