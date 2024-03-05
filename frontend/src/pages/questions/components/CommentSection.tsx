import { Comments } from "./Comments";

export const CommentSection = () => (
  <div>
    <details className="collapse bg-base-200 rounded-none">
      <summary className="collapse-title font-medium btn text-lg font-bold">
        {/* How to center that? It's so hard lol. I struggled for a while */}
        <div className="text-center">Show 3 Comments</div>
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
        </div>
      </div>
    </details>
  </div>
);
