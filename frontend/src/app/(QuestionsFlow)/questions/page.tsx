"use client"
import { useSearchParams } from "next/navigation"
import { Icons } from "../../../shared/components/Icons"
import { questionsViews } from "../../../shared/enums"

const items = [
  { id: "infancy", icon: "egg-crack", title: "Infancy", subtitle: "0-1 Years" },
  { id: "toddler", icon: "baby", title: "Toddler", subtitle: "1-3 Years" },
  { id: "child", icon: "tooth", title: "Child", subtitle: "3-8 Years" },
  { id: "preteen", icon: "backpack", title: "Preteen", subtitle: "9-12 Years" },
  { id: "teen", icon: "person-simple-throw", title: "Teen", subtitle: "13-16 Years" },
  { id: "adult", icon: "graduation-cap", title: "Adult", subtitle: "17-21 Years" },
  { id: "household", icon: "house-line", title: "Household", subtitle: "Parents & kids" },
  { id: "relatives", icon: "users-three", title: "Relatives", subtitle: "Beyond home" }
]

let questions = [
  {
    id: "1",
    title: `As my little one begins to experience a wider range of emotions, what strategies or games could help them understand and express these feelings in a healthy, age-appropriate way?`,
    votes: 7,
    answers: 3,
    approved: true,
    views: 419,
    type: "toddler",
    user: "Antoni",
    userImage: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
    timeAgo: "2 min ago"
  },
  {
    id: "2",
    title: `It's natural for young children to be scared of the unknown or everyday things. What can I do, or stories can I tell, to reassure them and reduce their fears during these startling moments?`,
    votes: 0,
    answers: 1,
    approved: false,
    views: 182,
    type: "teen",
    user: "Michel Floyd",
    userImage: "https://i.pravatar.cc/150?img=3",
    timeAgo: "53 min ago"
  },
  {
    id: "3",
    title: `It's not uncommon to feel frustrated when dealing with the challenges of this age. How can I effectively manage my own feelings, so it doesn't impact my child negatively during these teaching moments?`,
    votes: 0,
    answers: 0,
    views: 92,
    type: "preteen",
    user: "Michel Floyd",
    userImage: "https://i.pravatar.cc/150?img=3",
    timeAgo: "53 min ago"
  }
]

export default function HomePage() {
  const searchParams = useSearchParams()
  const filter = (searchParams.get("filter") as string) || ""
  const item = items.find((item) => item.id === filter)
  return (
    <div>
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

      <div
        role="tablist"
        className="mt-6 rounded-none justify-center border-t border-base-200 flex gap-4 h-12 items-center"
      >
        {questionsViews.map((item) => (
          <button
            key={item}
            className="text-base-300 font-bold"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="border-b border-base-300 bg-base-200">
        {questions.map(
          ({ id, type, title, votes, answers, views, userImage, user, timeAgo, approved }) => (
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
                        variant={items.find((x) => x.id === type)?.icon as string}
                        className="fill-base-content text-5"
                        weight="fill"
                      />
                      <div>{items.find((x) => x.id === type)?.title}</div>
                      <div>|</div>
                      <div>{items.find((x) => x.id === type)?.subtitle}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  )
}
