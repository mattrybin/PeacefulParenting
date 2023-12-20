import { signOut } from "next-auth/react"
import Link from "next/link"
import { auth } from "shared/auth"
import { GoogleSignInButton } from "shared/components/AuthButtons"
import { SignOutButton } from "../components/SignOutButton"

export default async function Page() {
  const session = await auth()
  const imageUrl = session?.user?.image?.replace("=s96-c", "")
  // const imageUrl = session?.user?.image ?? ""
  if (session) {
    return (
      <div className="grid justify-center text-center pt-20 gap-4">
        <div className="w-40 h-40 rounded-box border-2 border-base-content mx-auto">
          <img
            className="h-full w-full rounded-[13px]"
            src={imageUrl}
          />
        </div>
        <div>
          <div className="font-semibold">{session.user?.name}</div>
          <div className="font-semibold text-base-content/50">{session.user?.email}</div>
        </div>
        <SignOutButton />
      </div>
    )
  }
  return (
    <div className="grid justify-center text-center pt-20 gap-4">
      <div className="grid justify-center">
        <div className="font-bold text-lg">login or Signup</div>
        <GoogleSignInButton />
      </div>
      <div className="text-base-content/50">We only accept Google users for now.</div>
    </div>
  )
}
