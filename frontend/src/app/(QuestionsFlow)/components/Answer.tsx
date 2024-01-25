export const Answer = ({
  rating,
  author,
  createdWhen,
  answer,
  commentatorText,
  commentator,
  dateTime,
  //   amountOfComments,
  commentStatus,
}: {
  rating: string;
  author: string;
  createdWhen: string;
  answer: string;
  commentStatus: string;
  commentatorText: string;
  commentator: string;
  dateTime: string;
  //   amountOfComments: string;
}) => (
  <div>
    <div className="flex font-semibold">
      <div className="w-max text-3xl ipad:text-5xl border border-base-300 border-l-0 content-center grid">
        <div>
          <div
            className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
            onClick={() => console.log("UP")}
          >
            <i className="ph-bold ph-arrow-circle-up"></i>
          </div>
          <div className="text-xl flex justify-center py-1 ipad:text-3xl">
            {rating}
          </div>
          <div
            className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
            onClick={() => console.log("DOWN")}
          >
            <i className="ph-bold ph-arrow-circle-down"></i>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex p-6 gap-2 h-max w-full border-t border-base-300 border-x-0 items-center ipad:p-9">
          <div className="bg-base-300 h-6 w-6 rounded border border-base-300/35 ipad:h-8 ipad:w-8"></div>
          <div className="text-base ipad:text-2xl">{author}</div>
        </div>
        <div></div>
        {/* probably remove this part */}
        {/* <div className="flex justify-around text-base border-0 border-r-0">
          <div className="p-4 mx-auto">{amountOfComments} Comments</div>
        </div> */}

        <div className="p-6 border text-base border-r-0 border-base-300 ipad:p-9">
          <div className="flex gap-2 items-center ipad:text-2xl">
            <i className="ph-bold ph-calendar text-7 ipad:text-3xl"></i>
            {createdWhen}
          </div>
        </div>
      </div>
    </div>
    <div className="p-6 text-lg ipad:text-2xl">{answer}</div>
    <div className="flex justify-end p-6 text-base-300 items-center gap-2">
      <button className="ipad:text-xl">{commentStatus}</button>
    </div>
    <div>
      <div className="px-6 pt-6 pb-2 border-y border-base-300 text-lg ipad:text-2xl">
        {commentatorText}
        <div>
          <div className="flex justify-end gap-2 font-semibold pt-4 ipad:text-xl">
            <span className="font-medium text-base-300">{commentator}</span>
            <span className="text-base-300"> {dateTime}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
