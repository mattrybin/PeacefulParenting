"use client"
import { ReadonlyURLSearchParams, usePathname } from "next/navigation"
import * as R from "ramda"

import { Icons } from "./Icons"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { checkPath } from "../utils"
import { categories } from "shared/enums"
import { useSession } from "next-auth/react"
import { DropdownMenu } from "./Header/DropdownMenu"

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
        <div className="h-14 grid grid-flow-col items-center grid-cols-[max-content_1fr] gap-10 px-4 max-w-[1000px] mx-auto">
          <HeaderBranding />
          <Search />
          {/* <HeaderController /> */}
        </div>
        <FilterTab />
      </div>
    </div>
  </div>
)

const HeaderBranding = () => (
  <Link
    href={"/"}
    className="font-semibold gap-[1px] flex text-lg transition hover:text-primary"
  >
    <span>PeacefulParenting</span>
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
      },
      "600": {
        slidesPerView: 5.4,
        spaceBetween: 15
      },
      "700": {
        slidesPerView: 6.4,
        spaceBetween: 15
      },
      "800": {
        slidesPerView: 7.4,
        spaceBetween: 15
      },
      "900": {
        slidesPerView: 8.4,
        spaceBetween: 15
      },
      "1000": {
        slidesPerView: 9.4,
        spaceBetween: 15
      }
    }
  }
  if (path === "questions") {
    return (
      <div className="pb-5 max-w-[1000px] mx-auto pt-2">
        <Swiper {...swiperParams}>
          {categories.map(({ id, icon, title, subtitle }) => (
            <SwiperSlide key={id}>
              <Link
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

const MobileHeaderController = () => {
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
