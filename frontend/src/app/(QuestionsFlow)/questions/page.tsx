"use client"
import { useQuestions } from "./page.hook"
import { PageContainer } from "shared/components/Containers"
import { Pagination } from "../components/Pagination"
import { QuestionsHeader } from "../components/headers"
import { List } from "../components/List"
import { Tabs } from "../components/Tabs"

export default function HomePage() {
  const { header, tabs, list, pagination } = useQuestions()
  return (
    <PageContainer>
      <QuestionsHeader {...header} />
      <Tabs {...tabs} />
      <List {...list} />
      <Pagination {...pagination} />
    </PageContainer>
  )
}
