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

type Post struct {
	Title       string
	Category    string
	ViewCount   int
	VoteCount   int
	AnswerCount int
}

var questions = []map[string]string{
	{"category": "infancy", "title": "How can I manage my infant's sleep schedule effectively?"},
	{"category": "infancy", "title": "Is it normal for my 1-year-old to not be walking yet?"},
	{"category": "infancy", "title": "How should I introduce solid foods to my 6-month-old baby?"},
	{"category": "infancy", "title": "What are the signs that my infant may be teething, and how can I soothe them?"},
	{"category": "infancy", "title": "Is it alright for my 4-month-old to sleep through the night without a feeding?"},
	{"category": "infancy", "title": "What are some age-appropriate activities to engage my 1-year-old's developing senses?"},
	{"category": "infancy", "title": "How can I help my infant develop a strong bond with their siblings?"},
	{"category": "infancy", "title": "My infant seems to be afraid of strangers, is this normal and how should I handle it?"},
	{"category": "infancy", "title": "What are the best techniques for calming my baby during a bout of intense crying?"},
	{"category": "infancy", "title": "How can I gradually get my 1-year-old to start using a sippy cup?"},
}

func createPost(index int) Post {
	post := Post{}

	err := faker.FakeData(&post)

	if err != nil {
		fmt.Println(err)
	}
	views, _ := faker.RandomInt(1, 500, 1)
	votes, _ := faker.RandomInt(1, 20, 1)
	answers, _ := faker.RandomInt(1, 5, 1)
	post.Title = questions[index]["title"]
	post.Category = questions[index]["category"]
	post.ViewCount = views[0]
	post.VoteCount = votes[0]
	post.AnswerCount = answers[0]

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

	nPost := 5
	posts := make([]Post, nPost)

	for i := range posts {
		posts[i] = createPost(i)
	}
	insertPosts(db, posts)
}

func insertPosts(db *sql.DB, posts []Post) ([]string, error) {
	sqlStatement := "INSERT INTO posts (title, category, view_count, vote_count, answer_count) VALUES ($1, $2, $3, $4, $5) RETURNING id;"
	ids := make([]string, len(posts))
	var err error

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	for i, post := range posts {
		lastInsertId := ""
		err = tx.QueryRow(sqlStatement, post.Title, post.Category, post.ViewCount, post.VoteCount, post.AnswerCount).Scan(&lastInsertId)
		if err != nil {
			fmt.Println("ERROR", err)
			tx.Rollback()
			return nil, err
		}
		ids[i] = lastInsertId
	}

	err = tx.Commit()
	if err != nil {
		fmt.Println("ERROR", err)
		tx.Rollback()
		return nil, err
	}

	return ids, nil
}
