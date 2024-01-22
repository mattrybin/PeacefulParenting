import Link from "next/link"

export const Book = ({
  imgLink,
  bookTitle,
  author,
  briefInfo
}: {
  imgLink: string
  bookTitle: string
  author: string
  briefInfo: string
}) => (
  <Link
    href={"/"}
    target="_blank"
    className="grid grid-flow-col grid-cols-[120px_auto] ipad:grid-cols-[150px_auto] gap-4"
  >
    <div className="">
      <img
        className="rounded-sm"
        src={imgLink}
      />
    </div>
    <div className="text-2xl font-bold">
      {bookTitle}
      <div className="text-xs text-base-300 pt-1">
        {author}
        <div className="text-white text-sm pt-1 font-normal">{briefInfo}</div>
      </div>
    </div>
  </Link>
)
