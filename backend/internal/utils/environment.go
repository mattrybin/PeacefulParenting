package utils

import "os"

type EnvVars struct {
	PostgresUrl string
	Port        string
}

func SetupEnv() *EnvVars {
	postgresUrl := os.Getenv("POSTGRES_URL")
	port := os.Getenv("PORT")

	if port == "" {
		port = "4100"
	}
	if postgresUrl == "" {
		postgresUrl = "host=db port=5432 user=postgres password=password dbname=pp-db-development sslmode=disable"
	}

	return &EnvVars{
		PostgresUrl: postgresUrl,
		Port:        port,
	}
}
