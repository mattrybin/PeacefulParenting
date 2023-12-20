"use client"
import { Icons } from "../Icons"
import { useSession } from "next-auth/react"
import { DropdownMenu } from "./DropdownMenu"

export const MobileHeaderController = () => {
  const session = useSession()
  const isAuth = session.status === "authenticated"
  if (isAuth) {
    return (
      <div className="grid grid-flow-col items-center">
        <div className="avatar btn btn-ghost btn-square">
          <div className="w-7 h-7 rounded-lg border-2 border-base-content">
            <img
              src={session.data.user?.image || ""}
              alt="avatar"
            />
          </div>
        </div>
        <button className="btn btn-square btn-ghost">
          <Icons
            variant="magnifying-glass"
            weight="duotone"
            className="text-8"
          />
        </button>
        <DropdownMenu isUser={isAuth} />
      </div>
    )
  } else {
    return (
      <div className="grid grid-flow-col items-center">
        <button className="btn btn-square btn-ghost">
          <Icons
            variant="magnifying-glass"
            weight="duotone"
            className="text-8"
          />
        </button>
        <DropdownMenu isUser={isAuth} />
      </div>
    )
  }
}

export const HeaderController = () => {
  const session = useSession()
  const isAuth = session.status === "authenticated"
  if (isAuth) {
    return (
      <div className="grid grid-flow-col items-center">
        <div className="avatar btn btn-ghost btn-square">
          <div className="w-7 h-7 rounded-lg border-2 border-base-content">
            <img
              src={session.data.user?.image || ""}
              alt="avatar"
            />
          </div>
        </div>
        <button className="btn btn-square btn-ghost">
          <Icons
            variant="magnifying-glass"
            weight="duotone"
            className="text-8"
          />
        </button>
        <DropdownMenu isUser={isAuth} />
      </div>
    )
  } else {
    return (
      <div className="grid grid-flow-col items-center">
        <button className="btn btn-square btn-ghost">
          <Icons
            variant="magnifying-glass"
            weight="duotone"
            className="text-8"
          />
        </button>
        <DropdownMenu isUser={isAuth} />
      </div>
    )
  }
}
