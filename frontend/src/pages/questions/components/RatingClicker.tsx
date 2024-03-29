"use client"
import { useState } from "react"
import { Icons } from "shared/components/Icons"

export const RatingClicker = () => {
  const [count, setCount] = useState(0)
  return (
    <div className="w-max text-2xl ipad:text-5xl content-center grid">
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => {
          setCount(count + 1)
        }}
      >
        <i className="ph-bold ph-arrow-circle-up"></i>
      </div>
      <div className="text-xl flex justify-center py-1 ipad:text-2xl">{count}</div>
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => {
          setCount(count - 1)
        }}
      >
        <i className="ph-bold ph-arrow-circle-down"></i>
      </div>
    </div>
  )
}

export const RatingClicker2 = () => {
  const [count, setCount] = useState(0)
  const [upIconActive, setUpIconActive] = useState(false)
  const [downIconActive, setDownIconActive] = useState(false)

  const handleReset = () => {
    setUpIconActive(false)
    setDownIconActive(false)
    setCount(0)
  }
  const handleLike = () => {
    setUpIconActive(true)
    setDownIconActive(false)
    setCount(1)
  }
  const handleDislike = () => {
    setUpIconActive(false)
    setDownIconActive(true)
    setCount(-1)
  }

  return (
    <div className="border-r border-base-content/20">
      <div className="flex justify-center h-14 ">
        <div className="my-auto text-xl">{count}</div>
      </div>

      <div className="flex border-t border-base-content/20 h-14">
        <div
          className="grid place-content-center w-14 cursor-pointer hover:opacity-60 transition border-r border-base-content/20"
          onClick={!upIconActive ? handleLike : handleReset}
        >
          <Icons
            variant="thumbs-up"
            weight={upIconActive ? "fill" : "bold"}
            size="5"
          />
        </div>
        <div
          className="grid place-content-center w-14 cursor-pointer hover:opacity-60 transition"
          onClick={!downIconActive ? handleDislike : handleReset}
        >
          <Icons
            variant="thumbs-down"
            weight={downIconActive ? "fill" : "bold"}
            size="5"
          />
        </div>
      </div>
    </div>
  )
}
