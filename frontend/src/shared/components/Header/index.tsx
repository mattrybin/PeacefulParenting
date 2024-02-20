"use client";

import "swiper/css";
import { Search } from "./Search";
import { HeaderBranding } from "./Branding";
import { HeaderController, MobileHeaderController } from "./HeaderController";
import { FilterTab } from "./FilterTab";
import Link from "next/link";

export const Header = () => (
  <div className="header border-b border-base-200 bg-base-100">
    <div className="ipad:hidden ">
      <div className="h-14 grid grid-flow-col items-center grid-cols-[auto_max-content] px-4">
        <HeaderBranding />
        <MobileHeaderController />
      </div>
      <FilterTab />
    </div>
    <div className="hidden ipad:block">
      <div className="header border-b border-base-200 gap-2">
        <div className="h-14 grid grid-flow-col items-center grid-cols-[180px_1fr_180px] gap-10 px-4 max-w-[1000px] mx-auto">
          <HeaderBranding />
          {/* <Search /> */}
          <Menu />
          {/* <MobileHeaderController /> */}
          <HeaderController />
        </div>
        <FilterTab />
      </div>
    </div>
  </div>
);

const Menu = () => (
  <div className="flex gap-2 justify-center">
    <Link className="btn btn-ghost" href="/questions">
      Questions
    </Link>
    <Link className="btn btn-ghost" href="/chat">
      Chat AI
    </Link>
    <Link className="btn btn-ghost" href="/resources">
      Resources
    </Link>
  </div>
);
