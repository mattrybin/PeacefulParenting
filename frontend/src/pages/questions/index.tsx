import { useQuestions } from "./index.hook"

export default function Page() {
  const { awesome } = useQuestions()
  return <div>{awesome}</div>
}
