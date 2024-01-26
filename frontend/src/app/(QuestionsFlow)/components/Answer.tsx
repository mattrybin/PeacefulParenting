export const Answer = ({
  rating,
  author,
  createdWhen,
  answer,
  commentatorText,
  commentator,
  dateTime,
  commentStatus
}: {
  rating: string
  author: string
  createdWhen: string
  answer: string
  commentStatus?: string
  commentatorText?: string
  commentator?: string
  dateTime?: string
}) => (
  <div className="">
    <div className="flex font-semibold border-y border-base-300">
      <div className="w-max text-2xl ipad:text-5xl border-r border-base-300 content-center grid">
        <div className="px-4 py-1">
          <div
            className="cursor-pointer p-1 hover:opacity-60 transition"
            onClick={() => console.log("UP")}
          >
            <i className="ph-bold ph-arrow-circle-up"></i>
          </div>
          <div className="text-lg flex justify-center ipad:text-3xl">{rating}</div>
          <div
            className="cursor-pointer p-1 hover:opacity-60 transition"
            onClick={() => console.log("DOWN")}
          >
            <i className="ph-bold ph-arrow-circle-down"></i>
          </div>
        </div>
      </div>
      <div className="w-full grid">
        <div className="flex p-3 gap-2 w-full items-center ipad:p-9 border-b border-base-300">
          <div className="bg-base-300 h-6 w-6 rounded ipad:h-8 ipad:w-8" />
          <div className="text-base ipad:text-2xl">{author}</div>
        </div>
        <div className="p-3 text-base ipad:p-9 flex items-center">
          <div className="flex gap-2 items-center ipad:text-2xl">
            <i className="ph-bold ph-calendar text-7 ipad:text-3xl" />
            {createdWhen}
          </div>
        </div>
      </div>
    </div>
    <div className="p-6 text-lg ipad:text-2xl">{answer}</div>
    <div className="flex justify-end p-6 text-base-300 items-center gap-2 border-b border-base-300">
      <button className="btn ipad:text-xl">{commentStatus}</button>
    </div>
    {/* <div>
      <div className="px-6 pt-6 pb-2 border-y border-base-300 text-lg ipad:text-2xl">
        {commentatorText}
        <div>
          <div className="flex justify-end gap-2 font-semibold pt-4 ipad:text-xl">
            <span className="font-medium text-base-300">{commentator}</span>
            <span className="text-base-300"> {dateTime}</span>
          </div>
        </div>
      </div>
    </div> */}
  </div>
)
