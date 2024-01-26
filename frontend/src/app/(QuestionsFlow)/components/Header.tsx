import { title } from "process";
import { QuestionHeader } from "./QuestionHeader";

export const Header = () => (
  <div className="border-b">
    <div className=" grid gap-2">
      <div className="font-semibold">
        <div className="p-6">
          <div className="py-2 text-lg ipad:text-xl">
            <i className="ph-bold ph-baby"></i> Toddler
          </div>
          <div className="text-xl ipad:text-2xl">{title}</div>
        </div>
        <QuestionHeader
          author="Matt Rybin"
          amountOfAnswers="3"
          amountOfViews="243"
          createdWhen="23 days ago"
        />
      </div>
    </div>
  </div>
);
