package main

import (
	"database/sql"
	"fmt"
	"time"

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
	CreateAt    int
}

var questions = []map[string]string{
	{"category": "infant", "title": "How can I manage my infant's sleep schedule effectively?"},
	{"category": "infant", "title": "Is it normal for my 1-year-old to not be walking yet?"},
	{"category": "infant", "title": "How should I introduce solid foods to my 6-month-old baby?"},
	{"category": "infant", "title": "What are the signs that my infant may be teething, and how can I soothe them?"},
	{"category": "infant", "title": "Is it alright for my 4-month-old to sleep through the night without a feeding?"},
	{"category": "infant", "title": "What are some age-appropriate activities to engage my 1-year-old's developing senses?"},
	{"category": "infant", "title": "How can I help my infant develop a strong bond with their siblings?"},
	{"category": "infant", "title": "My infant seems to be afraid of strangers, is this normal and how should I handle it?"},
	{"category": "infant", "title": "What are the best techniques for calming my baby during a bout of intense crying?"},
	{"category": "infant", "title": "How can I gradually get my 1-year-old to start using a sippy cup?"},
	{"category": "toddler", "title": "How can I help my 2-year-old overcome fear of the dark?"},
	{"category": "toddler", "title": "What are techniques to alleviate separation anxiety in my toddler?"},
	{"category": "toddler", "title": "How can I encourage more cooperative play in my 3-year-old?"},
	{"category": "toddler", "title": "Is it normal for my 1-year-old to not be talking yet?"},
	{"category": "toddler", "title": "How should I handle my toddler's newfound assertiveness?"},
	{"category": "toddler", "title": "What are some age-appropriate chores my 2-year-old can help with?"},
	{"category": "toddler", "title": "How can I get my toddler to eat vegetables?"},
	{"category": "toddler", "title": "At what age should my toddler be toilet trained?"},
	{"category": "toddler", "title": "How can I manage my toddler's tantrums in public?"},
	{"category": "toddler", "title": "What are some fun indoor activities for my 2-year-old?"},
	{"category": "toddler", "title": "Is it normal for my toddler to experience separation anxiety at daycare?"},
	{"category": "toddler", "title": "How should I deal with my 3-year-old's backtalk?"},
	{"category": "toddler", "title": "How can I make bedtimes smoother with my 2-year-old?"},
	{"category": "toddler", "title": "Should I be concerned about my 1-year-old not showing interest in toys?"},
	{"category": "toddler", "title": "How can I help my toddler understand sharing with siblings?"},
	{"category": "toddler", "title": "What are the strategies for dealing with selective eating in my toddler?"},
	{"category": "toddler", "title": "What are some effective techniques for calming a fussy toddler?"},
	{"category": "toddler", "title": "Should I be worried my toddler prefers playing alone?"},
	{"category": "toddler", "title": "How often should my toddler be taking a nap?"},
	{"category": "toddler", "title": "Is it normal for my toddler to be scared of loud noises?"},
	{"category": "child", "title": "How can I support my 4-year-old in making friends at preschool?"},
	{"category": "child", "title": "What are suitable learning activities for my 5-year-old?"},
	{"category": "child", "title": "How can I deal with my 6-year-old's fear of monsters?"},
	{"category": "child", "title": "Why is my 3-year-old suddenly wetting the bed?"},
	{"category": "child", "title": "What are strategies for improving my 7-year-old's reading skills?"},
	{"category": "child", "title": "How can I help my child cope with a school bully?"},
	{"category": "child", "title": "What are some healthy snacks I can make for my 6-year-old?"},
	{"category": "child", "title": "How can I explain the concept of death to my 5-year-old?"},
	{"category": "child", "title": "How do I help my 7-year-old manage homework stress?"},
	{"category": "child", "title": "Why does my child have difficulty making eye contact?"},
	{"category": "child", "title": "How can I get my 4-year-old to stop interrupting when adults are talking?"},
	{"category": "child", "title": "What are some effective methods to instill discipline in my child?"},
	{"category": "child", "title": "How do I address my 8-year-old's lying habit?"},
	{"category": "child", "title": "What is the right age to introduce chores and can you suggest some for a 5-year-old?"},
	{"category": "child", "title": "How can I improve my 6-year-old's attention span?"},
	{"category": "child", "title": "Is it normal if my 7-year-old is still afraid of the dark?"},
	{"category": "child", "title": "How to handle my 3-year-old's sudden aggression towards other kids?"},
	{"category": "child", "title": "What are some fun educational games for my 4-year-old?"},
	{"category": "child", "title": "Has my 8-year-old got ADD if he can't sit still?"},
	{"category": "child", "title": "Is it normal for my 5-year-old to have imaginary friends?"},
	{"category": "preteen", "title": "How can I talk to my 10-year-old about puberty?"},
	{"category": "preteen", "title": "How can I help my 12-year-old make healthy social media choices?"},
	{"category": "preteen", "title": "What are some signs of bullying I should look for in my 9-year-old?"},
	{"category": "preteen", "title": "How can I help my 11-year-old with math homework?"},
	{"category": "preteen", "title": "How can I encourage my 12-year-old to eat healthier?"},
	{"category": "preteen", "title": "Why is my 9-year-old suddenly so moody?"},
	{"category": "preteen", "title": "What are safe outdoor activities for my preteen?"},
	{"category": "preteen", "title": "How can I support my 10-year-old's interest in art?"},
	{"category": "preteen", "title": "How should I react to my preteen's interest in dating?"},
	{"category": "preteen", "title": "How can I help improve my 11-year-old's reading skills?"},
	{"category": "preteen", "title": "What are some effective discipline techniques for preteens?"},
	{"category": "preteen", "title": "How can I explain the hazards of smoking to my preteen?"},
	{"category": "preteen", "title": "How can I encourage my preteen to be more physically active?"},
	{"category": "preteen", "title": "What strategies can help my 12-year-old be more organized?"},
	{"category": "preteen", "title": "What are some ways to improve communication with my 9-year-old?"},
	{"category": "preteen", "title": "How can I help my preteen manage school stress?"},
	{"category": "preteen", "title": "Is it normal if my 10-year-old still has fears about the dark?"},
	{"category": "preteen", "title": "How do I address my preteen's concerns about body image?"},
	{"category": "preteen", "title": "What are some healthy ways for my 11-year-old to deal with anger?"},
	{"category": "preteen", "title": "How I can I educate my 12-year-old about internet safety?"},
	{"category": "teen", "title": "How do I discuss the dangers of drinking and driving with my teenager?"},
	{"category": "teen", "title": "How can I support my teen in dealing with academic pressure?"},
	{"category": "teen", "title": "How do I address my 14-year-old's inappropriate language use?"},
	{"category": "teen", "title": "How can I encourage my 15-year-old to participate in family activities?"},
	{"category": "teen", "title": "How do I handle my teenager's first relationship?"},
	{"category": "teen", "title": "What are some signs of drug use I should look for in my teen?"},
	{"category": "teen", "title": "How can I help my 13-year-old develop better study habits?"},
	{"category": "teen", "title": "What are some effective ways to teach financial responsibility to my teenager?"},
	{"category": "teen", "title": "Why is my 14-year-old always so tired?"},
	{"category": "teen", "title": "What are some tactics to manage screen time for my teenager?"},
	{"category": "teen", "title": "How can I support my 15-year-old in choosing a future career path?"},
	{"category": "teen", "title": "My teen is facing difficulties making friends, what can I do to help?"},
	{"category": "teen", "title": "How can I handle my 16-year-old's rebelliousness with positivity?"},
	{"category": "teen", "title": "What are some healthy coping mechanisms for teen stress?"},
	{"category": "teen", "title": "What should I do to make sure my teenager has a balanced diet?"},
	{"category": "teen", "title": "What are some age-appropriate consequences for my teenager's misconduct?"},
	{"category": "teen", "title": "How can I communicate effectively with my closed-off teenager?"},
	{"category": "teen", "title": "How do I talk to my teen about the responsibilities that come with a part-time job?"},
	{"category": "teen", "title": "Is it normal for a 13-year-old to have mood swings?"},
	{"category": "teen", "title": "What are some effective methods to improve my teen's self-esteem?"},
	{"category": "adult", "title": "How can I help my 18-year-old navigate their first year of college?"},
	{"category": "adult", "title": "What are suitable career paths for my 19-year-old who is unsure of future direction?"},
	{"category": "adult", "title": "How to teach my 17-year-old about credit and financial responsibility?"},
	{"category": "adult", "title": "How can I discuss safe drinking habits with my newly legal 21-year-old?"},
	{"category": "adult", "title": "How to handle my 20-year-old's first serious relationship?"},
	{"category": "adult", "title": "What are the signs of mental health issues in my 18-year-old college student?"},
	{"category": "adult", "title": "How can I encourage my 19-year-old to maintain a balanced diet and exercise routine?"},
	{"category": "adult", "title": "How can I support my 17-year-old during stressful senior year of high school?"},
	{"category": "adult", "title": "Is it normal for my 20-year-old to feel lost and unsure about their life's direction?"},
	{"category": "adult", "title": "How to talk to my 21-year-old about the risks of casual substance use?"},
	{"category": "adult", "title": "How can I help my 18-year-old cope with peer pressure in high school/college?"},
	{"category": "adult", "title": "Should I force my 19-year-old to get a part-time job?"},
	{"category": "adult", "title": "What are some ways to foster self-reliance in my 17-year-old?"},
	{"category": "adult", "title": "How can I encourage my 20-year-old to take better care of their personal hygiene?"},
	{"category": "adult", "title": "How can I support my 21-year-old through the challenge of finding their first job?"},
	{"category": "adult", "title": "How should I handle my 18-year-old's emotional outbursts?"},
	{"category": "adult", "title": "What signs of an unhealthy relationship should I discuss with my 19-year-old?"},
	{"category": "adult", "title": "How to encourage my 17-year-old to volunteer and engage in community service?"},
	{"category": "adult", "title": "How can I talk to my 20-year-old about responsible drinking?"},
	{"category": "adult", "title": "Is it normal that my 21-year-old seems to have less interest in family engagements?"},
	{"category": "household", "title": "How do I approach chores distribution among my children fairly?"},
	{"category": "household", "title": "How do we handle screen time rules in a multi-age household?"},
	{"category": "household", "title": "What should I consider when setting boundaries for my teenager at home?"},
	{"category": "household", "title": "How can we implement family meal times with busy schedules?"},
	{"category": "household", "title": "What can be done to ensure children respect shared household spaces?"},
	{"category": "household", "title": "How can we manage different bedtimes for kids in the same bedroom?"},
	{"category": "household", "title": "What are strategies to reduce sibling rivalry at home?"},
	{"category": "household", "title": "How do I discuss–with my children–the importance of respecting privacy at home?"},
	{"category": "household", "title": "What are some effective ways to manage noise levels in a household with kids?"},
	{"category": "household", "title": "How can I encourage family participation in house cleaning?"},
	{"category": "household", "title": "How should I handle discrepancies in disciplining styles between parents?"},
	{"category": "household", "title": "What should I do when my child does not want to participate in family activities?"},
	{"category": "household", "title": "How can I mediate when my kids fight over toys or games?"},
	{"category": "household", "title": "What's a good strategy for managing homework time effectively in a busy household?"},
	{"category": "household", "title": "How can I create a positive study environment at home for my kids?"},
	{"category": "household", "title": "How can I manage different nutritional needs within the family?"},
	{"category": "household", "title": "What are some strategies for building strong sibling relationships at home?"},
	{"category": "household", "title": "How can I teach my kids to manage their responsibilities at home effectively?"},
	{"category": "household", "title": "How do I handle my child's reluctance towards new foods in a family dinner setting?"},
	{"category": "household", "title": "How can we foster a sense of belonging and unity within our diverse family?"},
	{"category": "relatives", "title": "How should I handle when my child doesn't want to visit extended family?"},
	{"category": "relatives", "title": "What to do if my teenager is uncomfortable around certain relatives?"},
	{"category": "relatives", "title": "How can I maintain a strong relationship between my child and distant relatives?"},
	{"category": "relatives", "title": "What's a good strategy to manage my child's expectations about gifts from relatives?"},
	{"category": "relatives", "title": "How can I talk to my child about different values held by our extended family members?"},
	{"category": "relatives", "title": "Should I intervene when my sibling disciplines my child during family gatherings?"},
	{"category": "relatives", "title": "How can I address my child's fear of an elderly relative?"},
	{"category": "relatives", "title": "How should I discuss family conflict with my child?"},
	{"category": "relatives", "title": "What's a tactful way to handle pushy grandparents?"},
	{"category": "relatives", "title": "How can I help my child respect cultural customs of our relatives?"},
	{"category": "relatives", "title": "How do I discuss estranged or absent relatives with my child?"},
	{"category": "relatives", "title": "Why does my child behave differently around our relatives?"},
	{"category": "relatives", "title": "How to handle a relative who spoils my child?"},
	{"category": "relatives", "title": "How do I respond when a relative disagrees with my parenting approach?"},
	{"category": "relatives", "title": "How can I prepare my child for a holiday with different cultural practices at relatives' house?"},
	{"category": "relatives", "title": "How can we handle sensitive topics during family gatherings?"},
	{"category": "relatives", "title": "How to react when relatives compare my child to their cousins?"},
	{"category": "relatives", "title": "How can I motivate my teen to communicate more with their grandparents?"},
	{"category": "relatives", "title": "What are some strategies to ensure my child feels part of our extended family?"},
	{"category": "relatives", "title": "How can I help my child handle criticism from relatives?"},
}

type Question struct {
	Category  string
	Title     string
	ViewCount int
	VoteCount int
}

func addValues(questions []map[string]string) []Post {
	// create our Questions slice
	var expandedQuestions []Post

	// iterate over the original map and add to the new slice
	for _, q := range questions {
		views, _ := faker.RandomInt(1, 500, 1)
		votes, _ := faker.RandomInt(1, 20, 1)
		answers, _ := faker.RandomInt(1, 5, 1)
		createAt, _ := faker.RandomInt(1, 10000, 1)
		newQuestion := Post{
			Category: q["category"],
			Title:    q["title"],
			// assign a default value for viewCount and voteCount,
			// change as per your requirement
			ViewCount:   views[0],
			VoteCount:   votes[0],
			AnswerCount: answers[0],
			CreateAt:    createAt[0],
		}
		fmt.Println(newQuestion)
		expandedQuestions = append(expandedQuestions, newQuestion)
	}

	return expandedQuestions
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

	var listQuestions = addValues(questions)
	for i := range listQuestions {
		listQuestions[i] = createPost(i)
	}
	insertPosts(db, listQuestions)
}

func insertPosts(db *sql.DB, posts []Post) ([]string, error) {
	sqlStatement := "INSERT INTO posts (created_at, title, category, view_count, vote_count, answer_count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
	ids := make([]string, len(posts))
	var err error

	tx, err := db.Begin()
	if err != nil {
		return nil, err
	}

	for i, post := range posts {
		lastInsertId := ""
		err = tx.QueryRow(sqlStatement, time.Now().Add(-time.Duration(post.CreateAt)*time.Hour), post.Title, post.Category, post.ViewCount, post.VoteCount, post.AnswerCount).Scan(&lastInsertId)
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
