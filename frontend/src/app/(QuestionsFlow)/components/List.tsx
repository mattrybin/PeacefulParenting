import { Icons } from "shared/components/Icons"
import { timeAgo } from "shared/instances"
import { H } from "shared/utils"
import { useQuestions } from "../questions/page.hook"
import Link from "next/link"

export const List = ({
  isLoading,
  questions,
  item,
  items,
  isSuccess,
  isError,
  isEmpty
}: H<typeof useQuestions, "list">) => {
  if (isSuccess) {
    return (
      <div className="border-b border-base-200 bg-base-200/75">
        {!isLoading &&
          questions?.map(
            ({
              id,
              category,
              title,
              voteCount,
              answerCount,
              viewCount,
              user,
              createdAt,
              approved
            }: any) => (
              <Link
                href={`/questions/${id}`}
                key={id}
                className={`block border-b border-base-300/50 last:border-base-200 pt-4 px-4 ${
                  item && "pb-4"
                }`}
              >
                <div className="flex items-center gap-2 font-medium text-base-300">
                  {approved && (
                    <Icons
                      variant="check-fat"
                      weight="fill"
                      className="text-4 text-success"
                    />
                  )}
                  <div
                    className={`${
                      approved
                        ? "text-success font-semibold"
                        : answerCount > 0
                        ? "text-base-content font-semibold"
                        : "text-base-300"
                    } `}
                  >
                    {answerCount !== 1 ? `${answerCount} answers` : `${answerCount} answer`}
                  </div>
                  <div className="w-1 h-1 bg-base-300 rounded-full" />
                  <div>{voteCount} votes</div>
                  <div className="w-1 h-1 bg-base-300 rounded-full" />
                  <div>{viewCount} views</div>
                </div>
                <div className="my-2 mb-3 font-medium">{title}</div>
                <div className="text-right flex justify-end items-center">
                  <div className="avatar">
                    <div className="w-5 h-5 rounded border-2 border-base-content mr-[6px]">
                      <img
                        src={user?.image}
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="flex gap-1 font-medium">
                    <div className="text-accent">{user?.username}</div>
                    <div className="text-base-300">answered {timeAgo(createdAt)}</div>
                  </div>
                </div>
                {!item && (
                  <div className="flex justify-end mb-4 mt-1">
                    <div className="flex w-fit text-base-300 font-medium">
                      <div className="flex gap-2 items-center">
                        <Icons
                          variant={items.find((x: any) => x.id === category)?.icon as string}
                          className="fill-base-content text-5"
                          weight="fill"
                        />
                        <div>{items.find((x: any) => x.id === category)?.title}</div>
                        <div>|</div>
                        <div>{items.find((x: any) => x.id === category)?.subtitle}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            )
          )}
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="text-center text-base-300 pt-10">
        <span className="loading loading-infinity loading-lg"></span>
        <div className="font-semibold">Loading Questions</div>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="text-center text-base-300 pt-10 px-10">
        <Icons
          variant="warning"
          weight="duotone"
          className="text-10"
        />
        <div className="font-semibold">
          We are sorry, an unexpected error occurred. Please refresh your browser or try again
          later.
        </div>
      </div>
    )
  }
  if (isEmpty) {
    return (
      <div className="text-center text-base-300 pt-10">
        <Icons
          variant="smiley-meh"
          weight="duotone"
          className="text-10"
        />
        <div className="font-semibold">No questions found</div>
      </div>
    )
  }
}
