dev:
	@air

build:
	CGO_ENABLED=0 go build -o build/backend

clean:
	rm -rf build

run: build
	@go run main.go

test:
	@set -o pipefail
	@go test -v ./... -count=1 | { grep -v 'no test files'; true; }

.PHONY: debug
debug: 
	dlv debug 

seed:
	cd scripts/database && go run seed.go

migrate:
	migrate -database postgres://postgres:password@localhost:5432/postgres?sslmode=disable -path db/migrations up

migrate-down:
	migrate -database postgres://postgres:password@localhost:5432/postgres?sslmode=disable -path db/migrations down