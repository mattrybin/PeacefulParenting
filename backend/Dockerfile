FROM golang:1.21.5-alpine3.18 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
RUN CGO_ENABLED=0 go build -o build/backend

from alpine:3.18
WORKDIR /app
COPY --from=builder /app/build/backend .

expose 4100
CMD ["./backend"]