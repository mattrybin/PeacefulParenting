"use client"
import clsx from "clsx"
import { Icons } from "../Icons"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { isBrowserWindow } from "shared/utils"
import Link from "next/link"

export const DropdownMenu = ({ isUser }: { isUser: boolean }) => {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<string>(
    isBrowserWindow ? localStorage.getItem("theme") || "auto" : "auto"
  )
  const closeMenu = () => {
    console.log("CLICKED")
    setOpen(false)
  }
  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])
  return (
    <>
      {open && (
        <div
          onClick={closeMenu}
          className={clsx(
            "bg-base-300/50 fixed inset-0 z-10 animate-fade animate-ease-in animate-duration-300 cursor-pointer",
            {
              hidden: !open
            }
          )}
        />
      )}
      <div
        className={clsx("dropdown dropdown-end", {
          "dropdown-open": open
        })}
      >
        <div
          tabIndex={0}
          role="button"
          className="btn btn-square btn-ghost"
          onClick={() => setOpen(true)}
        >
          <div
            className={clsx("swap swap-rotate", {
              "swap-active": open
            })}
          >
            <Icons
              variant="x"
              weight="bold"
              className="text-8 swap-on"
            />
            <Icons
              variant="circles-four"
              weight="duotone"
              className="text-8 swap-off"
            />
          </div>
        </div>
        <Menu
          isUser={isUser}
          open={open}
          theme={theme}
          setTheme={setTheme}
          closeMenu={closeMenu}
        />
      </div>
    </>
  )
}

const Menu = ({
  isUser,
  open,
  theme,
  setTheme,
  closeMenu
}: {
  isUser: boolean
  open: boolean
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  closeMenu: () => void
}) => {
  return (
    <ul
      className={clsx("dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-80", {
        hidden: !open
      })}
      tabIndex={0}
    >
      <li className="">
        <Link
          href="/questions"
          onClick={closeMenu}
        >
          <Icons
            weight={"duotone"}
            variant={"seal-question"}
            size="7"
          />
          <div className="font-semibold">Questions</div>
        </Link>
      </li>
      <li>
        <Link
          href="/chat"
          onClick={closeMenu}
        >
          <Icons
            weight={"duotone"}
            variant={"wechat-logo"}
            size="7"
          />
          <div className="font-semibold">Chat AI</div>
        </Link>
      </li>
      <li>
        <Link
          href="/resources"
          onClick={closeMenu}
        >
          <Icons
            weight="duotone"
            variant="book-bookmark"
            size="7"
          />
          <div className="font-semibold">Resources</div>
        </Link>
      </li>
      <li>
        <Link
          href="/login"
          onClick={closeMenu}
        >
          <Icons
            weight="duotone"
            variant="user-circle"
            size="7"
          />
          <div className="font-semibold">{isUser ? "Account" : "Login"}</div>
        </Link>
      </li>
      <div className="grid grid-flow-row bg-base-200/50 border rounded-[7px] p-4 text-center gap-2 mt-2">
        <span className="w-full font-semibold text-base-content/80">Appearance</span>
        <div className="grid grid-flow-col grid-cols-[auto_1fr_auto] gap-2">
          <div
            className={clsx("btn btn-square", {
              "btn-primary": theme === "light"
            })}
            onClick={() => setTheme("light")}
          >
            <Icons
              weight={theme === "light" ? "fill" : "duotone"}
              variant={"sun"}
              size="7"
            />
          </div>
          <div
            className={clsx("btn", {
              "btn-primary": theme === "auto"
            })}
            onClick={() => setTheme("auto")}
          >
            Auto
          </div>
          <div
            className={clsx("btn btn-square", {
              "btn-primary": theme === "dark"
            })}
            onClick={() => setTheme("dark")}
          >
            <Icons
              weight={theme === "dark" ? "fill" : "duotone"}
              variant={"moon"}
              size="7"
            />
          </div>
        </div>
      </div>
    </ul>
  )
}
