import { useState } from "react"

export const useAsk = () => {
  const [selected, setSelected] = useState("")
  return {
    category: {
      selected,
      action: (x: string) => setSelected(x)
    },
    content: {
      title: "Ask a Parenting Question",
      goBack: "Questions"
    }
  }
}
