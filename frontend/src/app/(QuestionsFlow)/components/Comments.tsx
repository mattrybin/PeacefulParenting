export const Comments = ({
  text,
  commentator,
  dateTime,
}: {
  text: string;
  commentator: string;
  dateTime: string;
}) => (
  <div>
    <div className="px-6 pt-6 pb-2 border-y border-base-300 text-lg ipad:text-2xl">
      {text}
      <div>
        <div className="flex justify-end gap-2 font-semibold pt-4 ipad:text-xl">
          <span className="font-medium text-base-300">{commentator}</span>
          <span className="text-base-300"> {dateTime}</span>
        </div>
      </div>
    </div>
  </div>
);
