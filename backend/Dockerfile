# Builder Image
FROM golang:1.21.5-alpine3.18 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify
COPY . .
RUN CGO_ENABLED=0 go build -o build/backend

# Runtime Image
FROM golang:1.21.5-alpine3.18

# Install 'ca-certificates' and 'curl' in the final image.
RUN apk add --no-cache ca-certificates
RUN apk add --no-cache --virtual .build-deps curl 

# Download, make executable, and move 'air' binary.
RUN curl -fLo/air https://github.com/cosmtrek/air/releases/download/v1.49.0/air_1.49.0_linux_amd64
RUN chmod +x /air
RUN mv /air /usr/local/bin/air 

# Remove 'curl' after downloading 'air'.
RUN apk del .build-deps
WORKDIR /app
COPY --from=builder /app/build/backend .


EXPOSE 4100
CMD ["air"]