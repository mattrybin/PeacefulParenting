import { Icons } from "shared/components/Icons";
import { RatingClicker, RatingClicker2 } from "./RatingClicker";

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
  <div className="text-base-content">
    <div className="flex">
      <div className="w-max text-3xl border border-base-300 border-l-0 content-center grid ">
        <RatingClicker2 />
      </div>
      <div className="w-full">
        <div className="flex gap-2 h-14 w-full border border-base-300 border-x-0 items-center">
          <div className="bg-base-300 h-6 w-6 rounded border border-base-300/35"></div>
          <div className="text-base-content ipad:text-2xl">{author}</div>
        </div>
        <div className="flex justify-around text-base-content border-b border-base-300 h-14">
          <div className=" ipad:text-2xl mx-auto">
            {amountOfAnswers} Answers
          </div>
          <div className="bg-base-300 w-[1px]"></div>
          <div className=" ipad:text-2xl mx-auto">{amountOfViews} Views</div>
          {/* <div className="bg-base-300 w-[1px]"></div> */}
          {/* <div className="flex gap-2 items-center ipad:text-2xl ">
            <Icons weight="bold" variant="calendar" size="xl" />
            {createdWhen}
          </div> */}
        </div>

        {/* <div className="p-4 text-base-content border-y border-base-300 ipad:p-7">
        <div className="flex gap-2 items-center ipad:text-2xl ">
          <i className="ph-bold ph-calendar text-7 "></i>
          {createdWhen}
        </div>
      </div> */}
      </div>
    </div>
  </div>
);
