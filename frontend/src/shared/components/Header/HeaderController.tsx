"use client"
import { Icons } from "../Icons"
import { useSession } from "next-auth/react"
import { DropdownMenu } from "./DropdownMenu"
import Link from "next/link"

export const MobileHeaderController = () => (
  /* const session = useSession()*/ /* const isAuth = session.status === "authenticated"*/ /* if (isAuth) {*/ /*   return (*/ /*     <div className="grid grid-flow-col items-center">*/ /*       <Link*/ /*         href="/login"*/ /*         className="avatar btn btn-ghost btn-square"*/ /*       >*/ /*         <div className="w-7 h-7 rounded-lg border-2 border-base-content">*/ /*           <img*/ /*             src={session.data.user?.image || ""}*/ /*             alt="avatar"*/ /*           />*/ /*         </div>*/ /*       </Link>*/ /*       <DropdownMenu isUser={isAuth} />*/ /*     </div>*/ /*   )*/ /* } else {*/ <div className="grid grid-flow-col items-center">
    <DropdownMenu isUser={false} />
  </div>
)

export const HeaderController = () => {
  const session = useSession()
  const isAuth = session.status === "authenticated"
  if (isAuth) {
    return (
      <div className="grid grid-flow-col items-center justify-end">
        <Link
          href="/login"
          className="avatar btn btn-ghost btn-square"
        >
          <div className="w-7 h-7 rounded-lg border-2 border-base-content">
            <img
              src={session.data.user?.image || ""}
              alt="avatar"
            />
          </div>
        </Link>
        <DropdownMenu isUser={isAuth} />
      </div>
    )
  } else {
    return (
      <div className="grid grid-flow-col items-center justify-end gap-2">
        <Link
          href={"/login"}
          className="btn"
        >
          <Icons
            variant="user-circle"
            size="7"
            weight={"duotone"}
          />
          <div>Login</div>
        </Link>
        <DropdownMenu isUser={isAuth} />
      </div>
    )
  }
}
