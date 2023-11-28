"use client"
import { useEffect, useState } from "react"
import { Icons } from "./Icons"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { checkPath } from "../utils"

let array = [
  {
    id: "questions",
    icon: "seal-question",
    title: "Questions"
  },
  {
    id: "chat",
    icon: "Wechat-Logo",
    title: "Chat AI"
  },
  {
    id: "resources",
    icon: "book-bookmark",
    title: "Resources"
  },
  {
    id: "login",
    icon: "user-circle",
    title: "Log in"
  }
]
export const Footer = () => {
  const pathname = usePathname()
  const path = checkPath(pathname)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if (currentScrollPos > prevScrollPos) {
      setVisible(false)
    } else {
      setVisible(true)
    }

    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  })
  return (
    <div
      className={`footer grid grid-flow-col justify-center items-center border-t border-base-200 bg-base-100 transform-gpu ${
        visible ? "translate-y-0" : "translate-y-20"
      }`}
    >
      {array.map(({ id, title, icon }) => (
        <Link
          key={id}
          className="grid place-items-center gap-0"
          href={id}
        >
          <Icons
            variant={icon}
            className={`text-7 ${id === path ? "text-base-content" : "text-base-300"}`}
            weight={id === path ? "fill" : "duotone"}
          />
          <div
            className={`font-semibold text-3 ${
              id === path ? "text-base-content" : "text-base-300"
            }`}
          >
            {title}
          </div>
        </Link>
      ))}
    </div>
  )
}
