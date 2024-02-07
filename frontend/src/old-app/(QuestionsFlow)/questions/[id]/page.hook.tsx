import { categories } from "shared/enums"

export const useQuestion = () => {
  const category = categories[2]
  return {
    title: "7 year old daughter sat for 15 minutes before playing with friends",
    body: "",
    category
  }
}
