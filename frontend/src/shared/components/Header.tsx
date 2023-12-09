"use client"
import { ReadonlyURLSearchParams, usePathname, useRouter } from "next/navigation"
import * as R from "ramda"

import { Icons } from "./Icons"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { checkPath } from "../utils"

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
      <div className="header border-b border-base-200 py-1">
        <div className="h-14 grid grid-flow-col items-center grid-cols-[max-content_1fr] gap-10 px-4">
          <HeaderBranding />
          <Search />
          {/* <HeaderController /> */}
        </div>
        {/* <FilterTab /> */}
      </div>
    </div>
  </div>
)

const HeaderBranding = () => (
  <Link
    href={"/"}
    className="font-semibold gap-[1px] flex text-lg"
  >
    <span className="text-base-content">PeacefulParenting</span>
    <span className="text-base-300">.ai</span>
  </Link>
)

const Search = () => (
  <div className="form-control">
    <input
      type="text"
      placeholder="Search"
      className="input input-bordered w-auto input-sm"
    />
  </div>
)

const FilterTab = () => {
  const pathname = usePathname()
  const path = checkPath(pathname)
  const searchParams = useSearchParams()
  const filter = (searchParams.get("filter") as string) || ""
  const swiperParams = {
    slidesPerView: 3.8,
    slidesOffsetAfter: 17,
    slidesOffsetBefore: 3,
    spaceBetween: 15,
    freeMode: true,
    breakpoints: {
      "360": {
        slidesPerView: 3.8,
        spaceBetween: 15
      },
      "390": {
        slidesPerView: 3.6,
        spaceBetween: 15
      },
      "430": {
        slidesPerView: 4.4,
        spaceBetween: 15
      }
    }
  }
  const items = [
    { id: "infant", icon: "egg-crack", title: "Infant", subtitle: "0-1 Years" },
    { id: "toddler", icon: "baby", title: "Toddler", subtitle: "1-3 Years" },
    { id: "child", icon: "tooth", title: "Child", subtitle: "3-8 Years" },
    { id: "preteen", icon: "backpack", title: "Preteen", subtitle: "9-12 Years" },
    { id: "teen", icon: "person-simple-throw", title: "Teen", subtitle: "13-16 Years" },
    { id: "adult", icon: "graduation-cap", title: "Adult", subtitle: "17-21 Years" },
    { id: "household", icon: "house-line", title: "Household", subtitle: "Parents & kids" },
    { id: "relatives", icon: "users-three", title: "Relatives", subtitle: "Beyond home" }
  ]
  if (path === "questions") {
    return (
      <div className="pb-5">
        <Swiper {...swiperParams}>
          {items.map(({ id, icon, title, subtitle }) => (
            <SwiperSlide key={id}>
              <Link
                // href={"/"}
                // href={id !== filter ? `?${setParams({ filter: id })}` : "/questions"}
                // href={id !== filter ? `?${setParams({ filter: id })}` : "/questions"}
                // href={`?${setParams({ filter })}`}
                href={setParams(searchParams, { filter: id })}
                className="grid justify-center text-center"
              >
                <Icons
                  variant={icon}
                  className={`text-7 ${id === filter ? "text-base-content" : "text-base-300"}`}
                  weight={id === filter ? "fill" : "duotone"}
                />
                <div
                  className={`font-semibold -mb-[4px] ${
                    id === filter ? "text-base-content" : "text-base-300"
                  }`}
                >
                  {title}
                </div>
                <div className={`text-3 font-semibold text-base-300`}>{subtitle}</div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }
}

const MobileHeaderController = () => (
  <div className="grid grid-flow-col items-center gap-2">
    <div className="avatar">
      <div className="w-7 h-7 rounded-lg border-2 border-base-content mr-[4px]">
        <img
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          alt="avatar"
        />
      </div>
    </div>
    <Icons
      variant="magnifying-glass"
      weight="duotone"
      className="text-8"
    />
    <Icons
      variant="circles-four"
      weight="duotone"
      className="text-8"
    />
  </div>
)

const getCurrentParams = R.pipe<any, Record<string, string>>((params) => {
  let object = {}
  params.forEach((value: string, key: string) => {
    object = { ...object, [key]: value }
  })
  return object
})

export const setParams = (
  currentParams: ReadonlyURLSearchParams,
  params: Record<string, string>,
  toggle: boolean = true
): string => {
  const noneParamsExist = currentParams.size === 0
  if (noneParamsExist) {
    const result = `?${new URLSearchParams(params)}`
    return result
  } else {
    const current = getCurrentParams(currentParams)
    let mergedParams = R.mergeAll([current, params])
    if (toggle) {
      const firstToggleParms = R.pipe<any, any, [string, string]>(R.toPairs, R.head)(params)
      if (current[firstToggleParms[0]] === firstToggleParms[1]) {
        delete mergedParams[firstToggleParms[0]]
        return `?${new URLSearchParams(mergedParams)}`
      } else {
        return `?${new URLSearchParams(mergedParams)}`
      }
    } else {
      return `?${new URLSearchParams(mergedParams)}`
    }
  }
}

export const matchParams = (
  searchParams: ReadonlyURLSearchParams,
  attr: string,
  value: string,
  defaultValue: string
) => {
  const isParam = searchParams.get(attr.toLocaleLowerCase()) !== null
  const defaultMatch = defaultValue?.toLocaleLowerCase() === value?.toLocaleLowerCase()
  if (isParam) {
    return searchParams.get(attr.toLocaleLowerCase()) === value?.toLocaleLowerCase()
  } else {
    return defaultMatch
  }
}
