import { H } from "shared/utils";
import { Icons } from "shared/components/Icons";
import Link from "next/link";
import { useQuestions } from "../index.hook";

export const QuestionsHeader = ({ item }: H<typeof useQuestions, "header">) => {
  return (
    <div className="px-4 h-24 w-full grid max-content">
      {item ? (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Icons
              variant={item.icon}
              className="fill-base-content text-8"
              weight="fill"
            />
            <div>
              <div className="font-semibold text-4">{item.title}</div>
              <div className="font-semibold text-5 -mt-2 -mb-[3px]">
                Questions
              </div>
              <div className="font-semibold text-3 text-base-300">
                {item.subtitle}
              </div>
            </div>
          </div>
          <Link href={"questions/ask"} className="btn btn-primary">
            Ask Question
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="font-semibold text-5">Top Questions</div>
          <Link href={"questions/ask"} className="btn btn-primary">
            Ask Question
          </Link>
        </div>
      )}
    </div>
  );
};
