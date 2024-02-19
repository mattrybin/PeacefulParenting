"use client";

import "swiper/css";
// import { HeaderController, MobileHeaderController } from "./Header/HeaderController"
import { HeaderBranding } from "./Header/Branding";
import { FilterTab } from "./Header/FilterTab";
import { MobileHeaderController } from "./Header/HeaderController";

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
        <div className="desktop:mx-auto desktop:w-[1515px] h-16 grid grid-flow-col items-center grid-cols-[max-content_1fr] gap-10 px-4 small:max-content desktop:px-0">
          <HeaderBranding />
          {/* <Search /> */}
          <div className="desktop:pr-3 flex justify-end">
            <MobileHeaderController />
          </div>
        </div>
        <FilterTab />
      </div>
    </div>
  </div>
);
