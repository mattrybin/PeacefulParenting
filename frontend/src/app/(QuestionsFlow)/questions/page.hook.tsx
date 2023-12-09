import { useSearchParams } from "next/navigation"
import { useQuestionsQuery } from "../queries"
import { questionsViews } from "shared/enums"
import { useEffect, useState } from "react"

export const items = [
  { id: "infant", icon: "egg-crack", title: "Infant", subtitle: "0-1 Years" },
  { id: "toddler", icon: "baby", title: "Toddler", subtitle: "1-3 Years" },
  { id: "child", icon: "tooth", title: "Child", subtitle: "3-8 Years" },
  { id: "preteen", icon: "backpack", title: "Preteen", subtitle: "9-12 Years" },
  { id: "teen", icon: "person-simple-throw", title: "Teen", subtitle: "13-16 Years" },
  { id: "adult", icon: "graduation-cap", title: "Adult", subtitle: "17-21 Years" },
  { id: "household", icon: "house-line", title: "Household", subtitle: "Parents & kids" },
  { id: "relatives", icon: "users-three", title: "Relatives", subtitle: "Beyond home" },
  { id: "other", icon: "users-three", title: "Other", subtitle: "" }
]

const perPage = 10
export const useQuestions = () => {
  const [skip, setSkip] = useState(0)
  const page = skip / perPage + 1
  const searchParams = useSearchParams()
  const filter = (searchParams.get("filter") as string) || ""
  const sort = (searchParams.get("sort") as string) || ""
  const item = items.find((item) => item.id === filter)
  const { data, isLoading, isSuccess, isError } = useQuestionsQuery({
    category: item?.id,
    perPage,
    page,
    sort
  })

  useEffect(() => {
    if (skip !== 0) {
      setSkip(0)
    }
  }, [sort])
  const total = typeof data?.count === "string" ? Math.ceil(+data?.count / perPage) : 0
  return {
    header: {
      item
    },
    tabs: {
      questionsViews
    },
    list: {
      isSuccess: isSuccess && data?.response?.length !== 0,
      isEmpty: !isError && !isLoading && data?.response?.length === 0,
      isError,
      isLoading,
      questions: data?.response,
      item,
      items
    },
    pagination: {
      total,
      page,
      onNextPage: () => setSkip(skip + perPage),
      onPrevPage: () => setSkip(skip - perPage),
      perPage,
      setPerPage: () => null,
      hasPrevPage: page !== 1,
      hasNextPage: total !== page
    }
  }
}
