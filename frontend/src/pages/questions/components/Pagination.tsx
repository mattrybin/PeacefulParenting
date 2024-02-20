import { H } from "shared/utils";

import { Icons } from "shared/components/Icons";
import { useQuestions } from "../index.hook";

export const Pagination = ({
  page,
  total,
  hasPrevPage,
  hasNextPage,
  onNextPage,
  onPrevPage,
}: H<typeof useQuestions, "pagination">) => {
  return (
    <div className="justify-self-center py-6">
      <div className="join">
        <button
          className={`join-item btn btn-md btn-square ${
            !hasPrevPage ? "btn-disabled" : ""
          }`}
          onClick={onPrevPage}
        >
          <Icons variant="arrow-fat-left" weight="fill" size="5" />
        </button>
        <button className="join-item btn btn-md px-10 pointer-events-none">
          {page}/{total}
        </button>
        <button
          className={`join-item btn btn-square btn-md ${
            !hasNextPage ? "btn-disabled" : ""
          }`}
          onClick={onNextPage}
        >
          <Icons variant="arrow-fat-right" weight="fill" size="5" />
        </button>
      </div>
    </div>
  );
};
