"use client";
import Link from "next/link";
import { Icons } from "shared/components/Icons";
import { SideBarBook } from "./SideBarBook";
import { SideBarBookSection } from "./SideBarBookSection";
import { SideBarCourse } from "./SideBarCourse";
import { SideBarCourseSection } from "./SideBarCourseSection";

export const RightSideBar = () => {
  return (
    <div className="small:hidden desktop:block pl-10 pt-6 w-[440px]">
      <div className="items-center  w-[400px]">
        <SideBarBookSection />
      </div>
      <SideBarCourseSection />
    </div>
  );
};
