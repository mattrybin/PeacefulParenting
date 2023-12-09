"use client"
import { PageContainer } from "shared/components/Containers"
import { useAsk } from "./page.hook"
import { Icons } from "shared/components/Icons"
import { useRouter } from "next/navigation"
import { H } from "shared/utils"
import Link from "next/link"

export default function HomePage() {
  const { content, category, title, description, expand } = useAsk()
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <PageContainer>
      <div className="grid justify-center items-center gap-4 mt-2">
        <div className="flex justify-center">
          <Link
            className="btn btn-sm"
            href={"/questions"}
          >
            <Icons
              variant="arrow-fat-left"
              weight={"fill"}
            />
            <div>{content.goBack}</div>
          </Link>
        </div>
        <div className="text-5 font-semibold">{content.title}</div>
      </div>
      <div className="p-6 gap-6 grid">
        <CategoryField {...category} />
        {title.isFocused && <TitleHint />}
        <TitleField {...title} />
        {description.isFocused && <DescriptionHint />}
        <DescriptionField {...description} />
        {expand.isFocused && <ExpandHint />}
        <ExpectingField {...expand} />
      </div>
    </PageContainer>
  )
}

const TitleHint = () => (
  <div className="border border-base-200 rounded-box animate-fade-up animate-delay-300 animate-once">
    <div className="bg-base-200/50 border-b border-base-200 rounded-t-box py-2 px-6 font-semibold">
      Writing a good title
    </div>
    <div className="text-sm flex p-6 gap-4">
      <div className="">
        <Icons
          variant="pencil-line"
          weight="duotone"
          size="8"
        />
      </div>
      <div className="grid gap-2 pt-2">
        <div className="font-semibold">Your title should summarize the problem.</div>
        <div>
          You might find that you have a better idea of your title after writing out the rest of the
          question.
        </div>
      </div>
    </div>
  </div>
)

const DescriptionHint = () => (
  <div className="border border-base-200 rounded-box animate-fade-up animate-delay-300 animate-once">
    <div className="bg-base-200/50 border-b border-base-200 rounded-t-box py-2 px-6 font-semibold">
      Introduce the problem
    </div>
    <div className="text-sm flex p-6 gap-4">
      <div className="">
        <Icons
          variant="pencil-line"
          weight="duotone"
          size="8"
        />
      </div>
      <div className="grid gap-2 pt-2">
        <div>
          Explain how you encountered the problem you’re trying to solve, and any difficulties that
          have prevented you from solving it yourself.
        </div>
        <div>
          You might find that you have a better idea of your title after writing out the rest of the
          question.
        </div>
      </div>
    </div>
  </div>
)

const ExpandHint = () => (
  <div className="border border-base-200 rounded-box animate-fade-up animate-delay-300 animate-once">
    <div className="bg-base-200/50 border-b border-base-200 rounded-t-box py-2 px-6 font-semibold">
      Expand on the problem
    </div>
    <div className="text-sm flex p-6 gap-4">
      <div className="">
        <Icons
          variant="pencil-line"
          weight="duotone"
          size="8"
        />
      </div>
      <div className="grid gap-2 pt-2">
        <div>Show what you’ve tried, tell us what happened, and why it didn’t meet your needs.</div>
      </div>
    </div>
  </div>
)

const TitleField = ({ action, enabled, isFocused }: any) => (
  <div
    className={`relative grid border border-base-200 rounded-box text-sm p-6 gap-2
  ${!enabled ? "opacity-50" : ""}`}
  >
    {!enabled && <div className="inset-0 bg-base-content/10 absolute rounded-box" />}
    <div>
      <div className="text-base font-semibold">Title</div>
      <div>Be specific and imagine you’re asking a question to another person.</div>
    </div>
    <input
      type="text"
      placeholder="e.g. What is the best food for my toddler?"
      className="input input-bordered w-full max-w-xs text-sm"
    />
    <div
      className={`btn btn-primary ${!isFocused ? "hidden" : ""}`}
      onClick={action}
    >
      Next
    </div>
  </div>
)

const DescriptionField = ({ enabled, action, isFocused }: any) => (
  <div
    id="description"
    className={`relative grid border border-base-200 rounded-box text-sm p-6 gap-2
  ${!enabled ? "opacity-50" : ""}`}
  >
    {!enabled && <div className="inset-0 bg-base-content/10 absolute rounded-box" />}
    <div>
      <div className="text-base font-semibold">What are the details of your problem?</div>
      <div>
        Introduce the problem and expand on what you put in the title. Minimum 20 characters.
      </div>
    </div>
    <textarea
      className="textarea textarea-bordered"
      placeholder=""
    ></textarea>
    <div
      className={`btn btn-primary ${!isFocused ? "hidden" : ""}`}
      onClick={action}
    >
      Next
    </div>
  </div>
)

const ExpectingField = ({ enabled }: any) => (
  <div
    className={`relative grid border border-base-200 rounded-box text-sm p-6 gap-2
  ${!enabled ? "opacity-50" : ""}`}
  >
    {!enabled && <div className="inset-0 bg-base-content/10 absolute rounded-box" />}
    <div>
      <div className="text-base font-semibold">What did you try and what were you expecting?</div>
      <div>
        Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20
        characters.
      </div>
    </div>
    <textarea
      className="textarea textarea-bordered"
      placeholder=""
    ></textarea>
    <div
      className={`btn btn-primary ${!enabled ? "hidden" : ""}`}
      // onClick={action}
    >
      Post Your questions
    </div>
  </div>
)

const items = [
  { id: "infant", icon: "egg-crack", title: "Infant", subtitle: "0-1 Years" },
  { id: "toddler", icon: "baby", title: "Toddler", subtitle: "1-3 Years" },
  { id: "child", icon: "tooth", title: "Child", subtitle: "3-8 Years" },
  { id: "preteen", icon: "backpack", title: "Preteen", subtitle: "9-12 Years" },
  { id: "teen", icon: "person-simple-throw", title: "Teen", subtitle: "13-16 Years" },
  { id: "adult", icon: "graduation-cap", title: "Adult", subtitle: "17-21 Years" },
  { id: "household", icon: "house-line", title: "Household", subtitle: "Parents & kids" },
  { id: "relatives", icon: "users-three", title: "Relatives", subtitle: "Beyond home" },
  { id: "other", icon: "note-blank", title: "Other", subtitle: "Anything" }
]

const CategoryField = ({ selected, action }: H<typeof useAsk, "category">) => (
  <div className="grid gap-4">
    <div className="text-5 text-center font-semibold text-primary">Choose a Category</div>
    <div className="grid grid-cols-3 grid-rows-3 gap-4">
      {items.map(({ title, subtitle, icon, id }, i) => (
        <div
          key={i}
          onClick={() => action(id)}
          className={`cursor-pointer transition-all bg-base-200/50 border border-base-200 rounded-box aspect-square grid place-content-center text-center
            ${id === selected ? "bg-primary text-primary-content" : ""}`}
        >
          <Icons
            variant={icon}
            className={`text-7 ${id === selected ? "text-primary-content" : "text-base-300"}`}
            weight={id === selected ? "fill" : "duotone"}
          />
          <div
            className={`font-semibold ${
              id === selected ? "text-primary-content" : "text-base-300"
            }`}
          >
            {title}
          </div>
          <div
            className={`text-3 font-semibold 
          ${id === selected ? "text-primary-content" : "text-base-300"}`}
          >
            {subtitle}
          </div>
        </div>
      ))}
    </div>
  </div>
)
