// import { useQuestions } from "./page.hook"
import { PageContainer } from "shared/components/Containers"
// import { Pagination } from "../components/Pagination"
// import { QuestionsHeader } from "../components/headers"
// import { List } from "../components/List"
// import { unstable_noStore } from "next/cache"
// import { cookies } from "next/headers"
// import { useEffect, useState } from "react"
// import { MyComponent } from "../components/Component"
// import { Tabs } from "../components/Tabs"

async function getData() {
  // const res = await fetch("https://dummy.restapiexample.com/api/v1/employees")
  // const res = await fetch("http://backend.peacefulparenting.local/api/v1/questions")
  const res = await fetch("http://backend:4100/api/v1/questions")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default async function HomePage() {
  const data = await getData()
  return (
    <PageContainer>
      {/* <MyComponent /> */}
      <div>{JSON.stringify(data)}</div>
      {/* <QuestionsHeader {...header} />
      <Tabs {...tabs} /> */}
      {/* <List {...list} /> */}
      {/* <Pagination {...pagination} /> */}
    </PageContainer>
  )
}
