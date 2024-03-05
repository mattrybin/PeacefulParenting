"use client"
import { usePathname } from "next/navigation"
import { Icons } from "../Icons"
import { Swiper, SwiperSlide } from "swiper/react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { checkPath, setParams } from "../../utils"
import { categories } from "shared/enums"

export const FilterTab = () => {
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
      <div className="pb-5 max-w-[1000px] mx-auto pt-2 desktop:max-w-[1240px]">
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
