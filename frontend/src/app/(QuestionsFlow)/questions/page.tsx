"use client"
import { H } from "shared/utils"
import { Icons } from "../../../shared/components/Icons"
import { useQuestions } from "./page.hook"
import { PageContainer } from "shared/components/Containers"

export default function HomePage() {
  const { header, tabs, list } = useQuestions()
  return (
    <PageContainer>
      <Header {...header} />
      <Tabs {...tabs} />
      <List {...list} />
    </PageContainer>
  )
}
const Header = ({ item }: H<typeof useQuestions, "header">) => {
  return (
    <>
      {item ? (
        <div className="flex justify-between items-center px-4 h-16">
          <div className="flex gap-2 items-center">
            <div>
              <Icons
                variant={item.icon}
                className="fill-base-content text-8"
                weight="fill"
              />
            </div>
            <div className="">
              <div className="font-semibold text-4">{item.title}</div>
              <div className="font-semibold text-5 -mt-2 -mb-[3px]">Questions</div>
              <div className="font-semibold text-3 text-base-300">{item.subtitle}</div>
            </div>
          </div>
          <button className="btn btn-primary">Ask Question</button>
        </div>
      ) : (
        <div className="flex justify-between items-center px-4 h-16">
          <div className="font-semibold text-5">Top Questions</div>
          <button className="btn btn-primary">Ask Question</button>
        </div>
      )}
    </>
  )
}

const Tabs = ({ questionsViews }: H<typeof useQuestions, "tabs">) => (
  <div
    role="tablist"
    className="mt-6 rounded-none justify-center border-t border-base-200 flex gap-4 h-12 items-center"
  >
    {questionsViews.map((item: any) => (
      <button
        key={item}
        className="text-base-300 font-bold"
      >
        {item}
      </button>
    ))}
  </div>
)

const List = ({ isLoading, questions, item, items }: H<typeof useQuestions, "list">) => (
  <div className="border-b border-base-300 bg-base-200">
    {!isLoading &&
      questions?.map(
        ({ id, type, title, votes, answers, views, userImage, user, timeAgo, approved }: any) => (
          <div
            key={id}
            className={`border-t border-base-300 pt-4 px-4 ${item && "pb-4"}`}
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
                    : answers > 0
                    ? "text-base-content font-semibold"
                    : "text-base-300"
                } `}
              >
                {answers !== 1 ? `${answers} answers` : `${answers} answer`}
              </div>
              <div className="w-1 h-1 bg-base-300 rounded-full" />
              <div>{votes} votes</div>
              <div className="w-1 h-1 bg-base-300 rounded-full" />
              <div>{views} views</div>
            </div>
            <div className="my-2 mb-3 font-medium">{title}</div>
            <div className="text-right flex justify-end items-center">
              <div className="avatar">
                <div className="w-5 h-5 rounded border-2 border-base-content mr-[6px]">
                  <img
                    src={userImage}
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="flex gap-1 font-medium">
                <div className="text-accent">{user}</div>
                <div className="text-base-300">answered {timeAgo}</div>
              </div>
            </div>
            {!item && (
              <div className="flex justify-end mb-4 mt-1">
                <div className="flex w-fit text-base-300 font-medium">
                  <div className="flex gap-2 items-center">
                    <Icons
                      variant={items.find((x: any) => x.id === type)?.icon as string}
                      className="fill-base-content text-5"
                      weight="fill"
                    />
                    <div>{items.find((x: any) => x.id === type)?.title}</div>
                    <div>|</div>
                    <div>{items.find((x: any) => x.id === type)?.subtitle}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
  </div>
)
