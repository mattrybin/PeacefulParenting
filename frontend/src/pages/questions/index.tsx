// import { useQuestions } from "./page.hook"
// import { getQuestions } from "app/testing"
import { PageContainer } from "shared/components/Containers"
import { getQuestions } from "shared/queries/questions"
import { List } from "./components/List"

const array = [
  {
    id: "2342",
    approved: true,
    answerCount: 0,
    voteCount: 0,
    viewCount: 0,
    title: "AWESOME",
    user: { username: "GOOD" },
    createdAt: "2024-02-09 16:56:38.969927"
  },
  {
    id: "123",
    approved: true,
    answerCount: 0,
    voteCount: 0,
    viewCount: 0,
    title: "GOOD",
    user: { username: "GOOD" },
    createdAt: "2024-02-09 16:56:38.969927"
  },
  {
    id: "124",
    approved: true,
    answerCount: 0,
    voteCount: 0,
    viewCount: 0,
    title: "GOOD",
    user: { username: "GOOD" },

    createdAt: "2024-02-09 16:56:38.969927"
  },
  {
    id: "125",
    approved: true,
    answerCount: 0,
    voteCount: 0,
    viewCount: 0,
    title: "GOOD",
    user: { username: "GOOD" },
    createdAt: "2024-02-09 16:56:38.969927"
  },
  {
    id: "126",
    approved: true,
    answerCount: 0,
    voteCount: 0,
    viewCount: 0,
    title: "GOOD",
    user: { username: "GOOD" },
    createdAt: "2024-02-09 16:56:38.969927"
  }
]
export default function HomePage() {
  // const { data, count } = await getQuestions({})
  return (
    <PageContainer>
      {/* <MyComponent /> */}
      {/* <QuestionsHeader {...header} />
      // <Tabs {...tabs} /> */}
      <List
        questions={array}
        isEmpty={false}
      />
      {/* <Pagination {...pagination} /> */}
    </PageContainer>
  )
}
