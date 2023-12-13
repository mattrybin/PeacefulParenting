export const questionsViews = [{ value: "top", label: "Top Views" }, { value: "new", label: "Latest" }] as const

export const categories = [
  { id: "infant", icon: "egg-crack", title: "Infant", subtitle: "0-1 Years" },
  { id: "toddler", icon: "baby", title: "Toddler", subtitle: "1-3 Years" },
  { id: "child", icon: "tooth", title: "Child", subtitle: "3-8 Years" },
  { id: "preteen", icon: "backpack", title: "Preteen", subtitle: "9-12 Years" },
  { id: "teen", icon: "person-simple-throw", title: "Teen", subtitle: "13-16 Years" },
  { id: "adult", icon: "graduation-cap", title: "Adult", subtitle: "17-21 Years" },
  { id: "household", icon: "house-line", title: "Household", subtitle: "Parents & kids" },
  { id: "relatives", icon: "users-three", title: "Relatives", subtitle: "Beyond home" },
  { id: "other", icon: "note-blank", title: "Other", subtitle: "Anything" }
] as const