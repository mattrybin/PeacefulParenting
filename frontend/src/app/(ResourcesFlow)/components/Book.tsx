export const Book = ({
  imgLink,
  bookTitle,
  author,
  briefInfo,
}: {
  imgLink: string;
  bookTitle: string;
  author: string;
  briefInfo: string;
}) => (
  <div className="flex gap-3">
    <div className=" w-24">
      <img className="rounded-sm" src={imgLink}></img>
    </div>
    <div className="w-[350px] text-2xl font-bold">
      {bookTitle}
      <div className="text-xs text-base-300 pt-1">
        {author}
        <div className="text-white text-sm pt-1 font-normal">{briefInfo}</div>
      </div>
    </div>
  </div>
);
