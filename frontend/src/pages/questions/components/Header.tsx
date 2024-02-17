import { QuestionHeader } from "./QuestionHeader"
import { useQuestion } from "../[id]/index.hook"
import { Icons } from "shared/components/Icons"
const { title } = useQuestion()
export const Header = () => (
  <div>
    <div className=" grid gap-2">
      <div className="font-semibold">
        <div className="py-3 px-6">
          <div className="items-center flex gap-1 btn btn-sm btn-outline w-max text-sm mb-2">
            <i className="ph-bold ph-baby text-base"></i> <span>Toddler</span>
          </div>
          <div className="text-xl ipad:text-2xl">{title}</div>
          <div className="gap-2 flex text-base-300 pt-1 items-center">
            <Icons
              weight="bold"
              variant="calendar"
              size="xl"
            />
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
)
