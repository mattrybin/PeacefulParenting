import { Answer } from "./Answer";

export const AnswerSection = () => (
  <div>
    <div className="flex bg-primary text-primary-content justify-center border-y border-base-300 p-2 gap-2 font-bold items-center ipad:text-lg ipad:p-4">
      <i className="ph-bold ph-plus"></i> <div>Add Answer</div>
    </div>
    <div>
      <div className="flex justify-center p-2 gap-2 font-bold bg-base-200 text-base-content ipad:text-lg ipad:p-4">
        <div>3 Answers</div>
      </div>

      <div>
        {/* {Answers.map((item) => (
          <Answer {...item} />
        ))} */}
        <Answer
          rating="24"
          author="Will Smith"
          createdWhen="23 days ago"
          answer="Hello, I think the problem is in the pickles"
          commentStatus="Show 4 Comments"
        />
        <Answer
          rating="12"
          author="Arnold Schwarzeneger"
          createdWhen="14 days ago"
          answer="That's a cool thingy. A lot of text here to check.A lot of text here to check.A lot of text here to check.A lot of text here to check.A lot of text here to check. I am terminator"
          commentStatus="Show 4 Comments"
        />
        <Answer
          rating="5"
          author="Jackie Chan"
          createdWhen="3 days ago"
          answer="I am a cool actor. Your question is interesting but not as good as me. a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text.a lot of text."
          commentStatus="Show 4 Comments"
        />
      </div>
    </div>
  </div>
);
