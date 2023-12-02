import { useSearchParams } from "next/navigation"
import { useQuestionsQuery } from "../queries"
import { questionsViews } from "shared/enums"

export const items = [
  { id: "infant", icon: "egg-crack", title: "Infant", subtitle: "0-1 Years" },
  { id: "toddler", icon: "baby", title: "Toddler", subtitle: "1-3 Years" },
  { id: "child", icon: "tooth", title: "Child", subtitle: "3-8 Years" },
  { id: "preteen", icon: "backpack", title: "Preteen", subtitle: "9-12 Years" },
  { id: "teen", icon: "person-simple-throw", title: "Teen", subtitle: "13-16 Years" },
  { id: "adult", icon: "graduation-cap", title: "Adult", subtitle: "17-21 Years" },
  { id: "household", icon: "house-line", title: "Household", subtitle: "Parents & kids" },
  { id: "relatives", icon: "users-three", title: "Relatives", subtitle: "Beyond home" }
]

type H<T extends (...args: any[]) => any> = <K extends keyof ReturnType<T>>() => ReturnType<T>[K]
export const useQuestions = () => {
  const { data: questions, isLoading } = useQuestionsQuery()
  const searchParams = useSearchParams()
  const filter = (searchParams.get("filter") as string) || ""
  const item = items.find((item) => item.id === filter)
  return {
    header: {
      item
    },
    tabs: {
      questionsViews
    },
    list: {
      isLoading,
      questions,
      item,
      items
    }
  }
}
