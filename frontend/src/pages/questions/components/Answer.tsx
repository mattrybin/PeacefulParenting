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
    <div className="flex font-semibold border-y border-base-content/20">
      <div className="w-max text-3xl ipad:text-5xl border-r border-base-content/20 content-center grid">
        <RatingClicker2 />
      </div>
      <div className="w-full grid">
        <div className="pl-3 flex gap-2 h-14 w-full items-center border-b border-base-content/20">
          <div className="bg-base-300 h-6 w-6 rounded border border-base-content/20" />
          <div className="text-base-content">{author}</div>
        </div>
        <div className="pl-3 flex gap-2 h-14 w-full items-center">
          <div className="flex gap-2 items-center ">
            <i className="ph-bold ph-calendar" />
            {createdWhen}
          </div>
        </div>
      </div>
    </div>
    <div className="p-6 text-lg pb-12">{answer}</div>
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
