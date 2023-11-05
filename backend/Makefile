build:
	CGO_ENABLED=0 go build -o build/backend

clean:
	rm -rf build

run: build
	go run main.go