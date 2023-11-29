package main

import (
	"database/sql"
	"fmt"

	"github.com/bxcodec/faker/v4"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

type User struct {
	Username string `faker:"username"`
}

type Post struct {
	Title    string `faker:"sentence"`
	Category string `faker:"oneof: infancy, toddler, child, preteen, teen, adult, household, relatives"`
	// Category string `faker:"username"`
}

func createUser() User {
	user := User{}

	err := faker.FakeData(&user)

	if err != nil {
		fmt.Println(err)
	}

	return user
}

func createPost() Post {
	post := Post{}

	err := faker.FakeData(&post)

	if err != nil {
		fmt.Println(err)
	}

	return post
}

func main() {
	db, err := sql.Open("postgres", "postgres://postgres:password@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		panic(err)
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})

	if err != nil {
		panic(err)
	}

	m, err := migrate.NewWithDatabaseInstance("file://./migrations", "postgres", driver)

	if err != nil {
		panic(err)
	}

	err = m.Down()

	if err != nil {
		fmt.Println(err)
	}

	err = m.Up()

	if err != nil {
		fmt.Println(err)
	}

	n := 5
	users := make([]User, n)

	for i := range users {
		users[i] = createUser()
	}

	nPost := 5
	posts := make([]Post, nPost)

	for i := range posts {
		posts[i] = createPost()
	}
	insertUsers(db, users)
	insertPosts(db, posts)
}

func insertUsers(db *sql.DB, users []User) ([]string, error) {
	sqlStatement := "INSERT INTO users (username) VALUES ($1) RETURNING id;"
	ids := make([]string, len(users))
	var err error

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	for i, user := range users {
		lastInsertId := ""
		err = tx.QueryRow(sqlStatement, user.Username).Scan(&lastInsertId)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		ids[i] = lastInsertId
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	return ids, nil
}

func insertPosts(db *sql.DB, posts []Post) ([]string, error) {
	sqlStatement := "INSERT INTO posts (title, category) VALUES ($1, $2) RETURNING id;"
	ids := make([]string, len(posts))
	var err error

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	for i, user := range posts {
		lastInsertId := ""
		err = tx.QueryRow(sqlStatement, user.Title, user.Category).Scan(&lastInsertId)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		ids[i] = lastInsertId
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	return ids, nil
}
