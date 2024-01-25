import { Answer } from "./Answer";
import { Comments } from "./Comments";

export const AnswerSection = (): void => {
  <div>
    <Answer
      rating="23"
      author="Will Smith"
      createdWhen="23 days ago"
      answer="Hello, I think the problem is in the pickles"
      commentStatus="Add comment"
    />
    <Answer
      rating="12"
      author="Arnold Schwarzeneger"
      createdWhen="14 days ago"
      answer="That's a cool thingy. A lot of text here to check.A lot of text here to check.A lot of text here to check.A lot of text here to check.A lot of text here to check. I am terminator"
      commentStatus="Show 2 comment"
    />
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
    </div>
    <Answer
      rating="5"
      author="Jackie Chan"
      createdWhen="3 days ago"
      answer="I am a cool actor. Your question is interesting but not as good as me. a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text."
      commentStatus="Add Comment"
    />
  </div>;
};
