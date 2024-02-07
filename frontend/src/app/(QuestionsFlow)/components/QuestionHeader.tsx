import { useState } from "react";
import { RatingClicker } from "./RatingClicker";
export const QuestionHeader = ({
  author,
  amountOfAnswers,
  amountOfViews,
  createdWhen,
}: {
  author: string;
  amountOfAnswers: string;
  amountOfViews: string;
  createdWhen: string;
}) => (
  <div className="flex text-base-content border-y border-base-300">
    <RatingClicker/>
    {/* <div className="w-max text-3xl ipad:text-4xl content-center grid border-r border-base-300">
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => console.log("UP")}
      >
        <i className="ph-bold ph-arrow-circle-up"></i>
      </div>
      <div className="text-xl flex justify-center py-1 ipad:text-2xl">24</div>
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => console.log("DOWN")}
      >
        <i className="ph-bold ph-arrow-circle-down"></i>
      </div>
    </div> */}

    <div className="w-full">
      <div className="flex p-3 gap-2 h-max w-full items-center border-b border-base-300">
        <div className="bg-base-300 h-6 w-6 rounded"></div>
        <div className="text-base-content">{author}</div>
      </div>
      <div className="flex justify-around text-base-content border-b border-base-300">
        <div className="p-3 mx-auto">{amountOfAnswers} Answers</div>
        <div className="bg-base-300 w-[1px]"></div>
        <div className="p-3 mx-auto">{amountOfViews} Views</div>
      </div>
      <div className="p-3 text-base-content">
        <div className="flex gap-2 items-center">
          <i className="ph-bold ph-calendar text-7 "></i>
          {createdWhen}
        </div>
      </div>
    </div>
  </div>
);
function clicker(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
  throw new Error("Function not implemented.");
}
