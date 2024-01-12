// import { useQuestions } from "./page.hook"
import { PageContainer } from "shared/components/Containers"
// import { Pagination } from "../components/Pagination"
// import { QuestionsHeader } from "../components/headers"
import { List } from "../components/List"
// import { Tabs } from "../components/Tabs"

export default async function HomePage() {
  const data = await fetch("http://127.0.0.1:4100/api/v1/questions", {
    headers: {
      "Content-Type": "application/json"
    },
    // data will revalidate every hour
    next: { revalidate: 3600 }
  })
    .then(async (res) => {
      return { count: res.headers.get("X-Total-Count"), response: await res.json() }
    })
    .catch((e) => console.log(e))

  const headersList = new Headers()
  const referer = headersList.get("X-Total-Count")
  // console.log(data.response)
  console.log(referer)
  // const { header, tabs } = useQuestions()
  return (
    <PageContainer>
      {/* <QuestionsHeader {...header} />
      <Tabs {...tabs} /> */}
      {/* <List {...list} /> */}
      {/* <Pagination {...pagination} /> */}
    </PageContainer>
  )
}
