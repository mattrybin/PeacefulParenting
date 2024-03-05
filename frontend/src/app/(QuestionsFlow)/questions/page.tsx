import { db } from "../../../db"

const getQuestions = async (data: any) => {
  return await db.query.posts.findMany()
}

export default async function Page(data: any) {
  const result = await getQuestions(data)
  return (
    <div>
      Questions:
      {result.map((item) => (
        <div>{item.body}</div>
      ))}
    </div>
  )
}
