export const Comments = ({
  text,
  commentator,
  dateTime
}: {
  text: string
  commentator: string
  dateTime: string
}) => (
  <div>
    <div className="px-4 py-4 border-b border-base-content ">
      {text}
      <div>
        <div className="flex justify-end gap-2 font-medium pt-4">
          <span className="">{commentator}</span>
          <span className="text-base-300"> {dateTime}</span>
        </div>
      </div>
    </div>
  </div>
)
