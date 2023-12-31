"use client"

import "swiper/css"
import { HeaderController, MobileHeaderController } from "./Header/HeaderController"
import { HeaderBranding } from "./Header/Branding"
import { FilterTab } from "./Header/FilterTab"

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
        <div className="h-16 grid grid-flow-col items-center grid-cols-[max-content_1fr] gap-10 px-4 max-w-[1000px] mx-auto">
          <HeaderBranding />
          {/* <Search /> */}
          <HeaderController />
        </div>
        <FilterTab />
      </div>
    </div>
  </div>
)
