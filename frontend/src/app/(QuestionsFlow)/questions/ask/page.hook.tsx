import { useReducer } from "react"

// initial state
const initialState = {
  focus: "category",
  category: {
    selected: undefined
  },
  title: {
    enabled: false
  },
  description: {
    enabled: false
  },
  expand: {
    enabled: false
  }
}
// reducer function
function reducer(state: any, action: any) {
  switch (action.type) {
    case "selectCategory":
      return {
        ...state,
        category: {
          ...state.category,
          selected: action.value
        }
      }
    case "enableTitle":
      return {
        ...state,
        focus: "title",
        title: {
          ...state.title,
          enabled: true
        }
      }
    case "disableTitle":
      return {
        ...state,
        title: {
          ...state.title,
          enabled: false
        }
      }
    case "enableDescription":
      return {
        ...state,
        focus: "description",
        description: {
          ...state.discription,
          enabled: true
        }
      }
    case "enableExpand":
      return {
        ...state,
        focus: "expand",
        expand: {
          ...state.expand,
          enabled: true
        }
      }
    default:
      throw new Error()
  }
}
export const useAsk = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    category: {
      selected: state.category.selected,
      action: (x: string) => {
        dispatch({ type: "selectCategory", value: x })
        dispatch({ type: "enableTitle" })
      }
    },
    title: {
      enabled: state.title.enabled,
      isFocused: state.focus === "title",
      action: () => dispatch({ type: "enableDescription" })
    },
    description: {
      isFocused: state.focus === "description",
      enabled: state.description.enabled,
      action: () => dispatch({ type: "enableExpand" })
    },
    expand: {
      isFocused: state.focus === "expand",
      enabled: state.expand.enabled
    },
    content: {
      title: "Ask a Parenting Question",
      goBack: "Questions"
    }
  }
}
