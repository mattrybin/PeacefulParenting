import { Comments } from "./Comments";
import { RatingClicker, RatingClicker2 } from "./RatingClicker";

export const Answer = ({
  rating,
  author,
  createdWhen,
  answer,
  commentatorText,
  commentator,
  dateTime,
  commentStatus,
}: {
  rating: string;
  author: string;
  createdWhen: string;
  answer: string;
  commentStatus?: string;
  commentatorText?: string;
  commentator?: string;
  dateTime?: string;
}) => (
  <div>
    <div className="flex font-semibold border-y border-base-300">
      <div className="w-max text-2xl ipad:text-5xl border-r border-base-300 content-center grid">
        <RatingClicker2 />
      </div>
      <div className="w-full grid">
        <div className="flex p-4 gap-2 w-full items-center border-b border-base-300">
          <div className="bg-base-300 h-6 w-6 rounded ipad:h-8 ipad:w-8" />
          <div className="ipad:text-2xl">{author}</div>
        </div>
        <div className="p-4 flex items-center">
          <div className="flex gap-2 items-center ipad:text-2xl">
            <i className="ph-bold ph-calendar text-7 ipad:text-3xl" />
            {createdWhen}
          </div>
        </div>
      </div>
    </div>
    <div className="p-6 text-lg ipad:text-2xl pb-12">{answer}</div>
    <div>
      <details className="collapse bg-base-200 w-2 rounded-none">
        <summary className="collapse-title text-xl font-medium btn text-right">
          {commentStatus}
        </summary>
        <div className="collapse-content">
          <div>
            <Comments
              text="Eventually she started to bowl on an empty lane, and when the other children came over she was talking to them."
              dateTime="May 9, 2023 at 10:23"
              commentator="Dave Smith"
            />
            <Comments
              text="Eventually she started to bowl on an empty lane, and when the other children came over she was talking to them."
              dateTime="May 9, 2023 at 10:23"
              commentator="Dave Smith"
            />
            <Comments
              text="Eventually she started to bowl on an empty lane, and when the other children came over she was talking to them."
              dateTime="May 9, 2023 at 10:23"
              commentator="Dave Smith"
            />
            <Comments
              text="Eventually she started to bowl on an empty lane, and when the other children came over she was talking to them."
              dateTime="May 9, 2023 at 10:23"
              commentator="Dave Smith"
            />
          </div>
        </div>
      </details>
    </div>
  </div>
);
