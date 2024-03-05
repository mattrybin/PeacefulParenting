import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { H, matchParams, setParams } from "shared/utils";
import { useQuestions } from "../index.hook";

export const Tabs = ({ questionsViews }: H<typeof useQuestions, "tabs">) => {
  const searchParams = useSearchParams();
  return (
    <div
      role="tablist"
      className="rounded-none justify-center border-t border-b border-base-200 flex gap-2 h-12 items-center"
    >
      {questionsViews.map(
        ({ value, label }: (typeof questionsViews)[number]) => (
          <Link
            href={setParams(searchParams, { sort: value }, false)}
            key={value}
            className={`font-bold ${
              matchParams(searchParams, "sort", value, "top")
                ? "btn btn-primary btn-sm"
                : "btn btn-ghost btn-sm text-base-300"
            }`}
          >
            {label}
          </Link>
        )
      )}
    </div>
  );
};