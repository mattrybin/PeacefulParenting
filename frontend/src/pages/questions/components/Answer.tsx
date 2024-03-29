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
      <RatingClicker2 />
      <div className="w-full grid">
        <div className="flex h-14 pl-3 gap-2 w-full items-center">
          <div className="bg-base-300 h-6 w-6 rounded" />
          <div>{author}</div>
        </div>
        <div className="h-14 pl-3 flex items-center border-t border-base-content/20">
          <div className="flex gap-2 items-center">
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
