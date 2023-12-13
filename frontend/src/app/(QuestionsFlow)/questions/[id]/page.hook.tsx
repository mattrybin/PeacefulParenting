export const useQuestion = () => {
  // const [skip, setSkip] = useState(0)
  // const page = skip / perPage + 1
  // const searchParams = useSearchParams()
  // const filter = (searchParams.get("filter") as string) || ""
  // const sort = (searchParams.get("sort") as string) || ""
  // const item = items.find((item) => item.id === filter)
  // const { data, isLoading, isSuccess, isError } = useQuestionsQuery({
  //   category: item?.id,
  //   perPage,
  //   page,
  //   sort
  // })

  // useEffect(() => {
  //   if (skip !== 0) {
  //     setSkip(0)
  //   }
  // }, [sort])
  // const total = typeof data?.count === "string" ? Math.ceil(+data?.count / perPage) : 0
  return {
    title: "7 year old daughter sat for 15 minutes before playing with friends",
    body: ""
    // header: {
    //   item
    // },
    // tabs: {
    //   questionsViews
    // },
    // list: {
    //   isSuccess: isSuccess && data?.response?.length !== 0,
    //   isEmpty: !isError && !isLoading && data?.response?.length === 0,
    //   isError,
    //   isLoading,
    //   questions: data?.response,
    //   item,
    //   items
    // },
    // pagination: {
    //   total,
    //   page,
    //   onNextPage: () => setSkip(skip + perPage),
    //   onPrevPage: () => setSkip(skip - perPage),
    //   perPage,
    //   setPerPage: () => null,
    //   hasPrevPage: page !== 1,
    //   hasNextPage: total !== page
    // }
  }
}
