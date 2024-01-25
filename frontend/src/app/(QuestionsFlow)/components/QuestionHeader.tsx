export const QuestionHeader = ({
  author,
  amountOfAnswers,
  amountOfViews,
  createdWhen,
}: {
  author: string;
  amountOfAnswers: string;
  amountOfViews: string;
  createdWhen: string;
}) => (
  <div className="flex text-base-content">
    <div className="w-max text-3xl ipad:text-6xl border border-base-300 border-l-0 content-center grid ">
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => console.log("UP")}
      >
        <i className="ph-bold ph-arrow-circle-up"></i>
      </div>
      <div className="text-xl flex justify-center py-1 ipad:text-3xl">23</div>
      <div
        className="cursor-pointer p-2 px-6 hover:opacity-60 transition"
        onClick={() => console.log("DOWN")}
      >
        <i className="ph-bold ph-arrow-circle-down"></i>
      </div>
    </div>
    <div className="w-full">
      <div className="flex p-4 gap-2 h-max w-full border border-base-300 border-x-0 ipad:p-9 items-center">
        <div className="bg-base-300 h-6 w-6 rounded border border-base-300/35"></div>
        <div className="text-base-content ipad:text-2xl">{author}</div>
      </div>
      <div className="flex justify-around text-base-content border border-r-0 border-base-300">
        <div className="p-4 mx-auto ipad:text-2xl ipad:p-9">
          {amountOfAnswers} Answers
        </div>
        <div className="bg-base-300 w-[1px]"></div>
        <div className="p-4 mx-auto ipad:text-2xl ipad:p-9">
          {amountOfViews} Views
        </div>
      </div>
      <div className="p-4 text-base-content border-0 ipad:p-9">
        <div className="flex gap-2 items-center ipad:text-2xl ">
          <i className="ph-bold ph-calendar text-7 "></i>
          {createdWhen}
        </div>
      </div>
    </div>
  </div>
);
