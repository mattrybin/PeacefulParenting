import { useSearchParams } from "next/navigation"
import { useQuestionsQuery } from "../queries"
import { categories, questionsViews } from "shared/enums"
import { useEffect, useState } from "react"

const perPage = 10
export const useQuestions = () => {
  const [skip, setSkip] = useState(0)
  const page = skip / perPage + 1
  const searchParams = useSearchParams()
  const filter = (searchParams.get("filter") as string) || ""
  const sort = (searchParams.get("sort") as string) || ""
  const item = categories.find((item) => item.id === filter)
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
      items: categories
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
