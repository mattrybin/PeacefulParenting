"use client"

import "swiper/css"
// import { HeaderController, MobileHeaderController } from "./Header/HeaderController"
import { HeaderBranding } from "./Header/Branding"
import { FilterTab } from "./Header/FilterTab"
import { MobileHeaderController } from "./Header/HeaderController"
import Link from "next/link"

export const Header = () => (
  <div className="header border-b border-base-200 bg-base-100">
    <div className="ipad:hidden">
      <div className="h-14 grid grid-flow-col items-center grid-cols-[auto_max-content] px-4">
        <HeaderBranding />
        <MobileHeaderController />
      </div>
      <FilterTab />
    </div>
    <div className="hidden ipad:block">
      <div className="header border-b border-base-200 gap-2">
        <div className="small:max-content desktop:mx-auto desktop:w-[1240px] h-16 grid grid-flow-col items-center grid-cols-[max-content_max-content] justify-between ap-10 px-4">
          <HeaderBranding />
          {/* <Menu /> */}
          <MobileHeaderController />
        </div>
        <FilterTab />
      </div>
    </div>
  </div>
)

const Menu = () => (
  <div className="flex gap-2 justify-center">
    <Link
      className="btn btn-ghost"
      href="/questions"
    >
      Questions
    </Link>
    <Link
      className="btn btn-ghost"
      href="/chat"
    >
      Chat AI
    </Link>
    <Link
      className="btn btn-ghost"
      href="/resources"
    >
      Resources
    </Link>
  </div>
)
