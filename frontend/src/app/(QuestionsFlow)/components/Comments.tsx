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
    <div className="px-6 pt-6 pb-2 border-b border-base-content ">
      {text}
      <div>
        <div className="flex justify-end gap-1 font-semibold pt-4">
          <span className="">{commentator}</span>
          <span className="text-base-300"> {dateTime}</span>
        </div>
      </div>
    </div>
  </div>
);
