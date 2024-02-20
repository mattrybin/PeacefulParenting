import Link from "next/link";

export const SideBarBook = ({
  imgLink,
  bookTitle,
  author,
  briefInfo,
  href,
}: {
  imgLink: string;
  bookTitle: string;
  author: string;
  briefInfo: string;
  href: string;
}) => (
  <Link
    href={href}
    target="_blank"
    className="grid grid-flow-col grid-cols-[120px_auto] "
  >
    <div className="w-28 pb-5">
      <img className="rounded-sm" src={imgLink} />
    </div>
    <div className="font-bold text-lg">
      {bookTitle}
      <div className="text-base-300 pt-1 text-xs">
        {author}
        <div className="text-base-content  pt-1 font-normal">{briefInfo}</div>
      </div>
    </div>
  </Link>
);
