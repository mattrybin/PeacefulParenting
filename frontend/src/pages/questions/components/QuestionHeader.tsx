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
    <div className="flex border-y border-base-content/20">
      <div className="w-max text-3xl content-center grid ">
        <RatingClicker2 />
      </div>
      <div className="w-full">
        <div className="pl-3 flex gap-2 h-14 w-full items-center">
          <div className="bg-base-300 h-6 w-6 rounded border border-base-content/20" />
          <div className="text-base-content">{author}</div>
        </div>
        <div className="grid grid-cols-2 justify-around text-base-content h-14 border-t border-base-content/20">
          <div className="border-r border-base-content/20 flex items-center justify-center">
            {amountOfAnswers} Answers
          </div>
          <div className="flex items-center justify-center">
            {amountOfViews} Views
          </div>
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
