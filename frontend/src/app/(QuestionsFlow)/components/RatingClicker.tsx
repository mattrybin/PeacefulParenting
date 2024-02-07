"use client";
import { useState } from "react";

export const RatingClicker = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="w-max text-3xl ipad:text-4xl content-center grid border-r border-base-300">
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        <i className="ph-bold ph-arrow-circle-up"></i>
      </div>
      <div className="text-xl flex justify-center py-1 ipad:text-2xl">
        {count}
      </div>
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => {
          setCount(count - 1);
        }}
      >
        <i className="ph-bold ph-arrow-circle-down"></i>
      </div>
    </div>
  );
};
