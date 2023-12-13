import { redirect } from "next/navigation"
import { auth } from "shared/auth"

// export default function HomePage() {
//   redirect("/questions")
// }

export default async function Home() {
  const session = await auth()
  if (session) {
    return redirect("/questions")
  } else {
    return redirect("/questions")
    // return redirect("/api/auth/signin")
  }
}
