import { QuestionHeader } from "./QuestionHeader";
import { useQuestion } from "../[id]/index.hook";
import { Icons } from "shared/components/Icons";
const { title } = useQuestion();
export const Header = () => (
  <div>
    <div className=" grid gap-2">
      <div className="font-semibold">
        <div className="p-6">
          <div className="py-2 text-lg ipad:text-2xl">
            <i className="ph-bold ph-baby"></i> Toddler
          </div>
          <div className="text-xl ipad:text-3xl">{title}</div>
          <div className="gap-2 flex text-base-300 pt-1 items-center">
            <Icons weight="bold" variant="calendar" size="xl" />
            23 days ago
          </div>
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
