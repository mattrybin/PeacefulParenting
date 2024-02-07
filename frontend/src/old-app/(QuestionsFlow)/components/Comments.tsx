export const Comments = ({
  text,
  commentator,
  dateTime
}: {
  text: string
  commentator: string
  dateTime: string
}) => (
  <div className="px-6 pt-6 pb-6 border-b border-base-300 text-lg ipad:text-2xl last:border-0">
    {text}
    <div>
      <div className="flex justify-end gap-2 pt-4 ipad:text-xl">
        <span className="font-semibold text-base-300">{commentator}</span>
        <span className="text-base-content/70"> {dateTime}</span>
      </div>
    </div>
  </div>
)
