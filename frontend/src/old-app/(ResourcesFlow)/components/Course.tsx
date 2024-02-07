export const Course = ({
  courseTitle,
  courseImg,
  briefInfo,
  authorImg,
  author,
  job,
}: any) => (
  <div>
    <div
      style={{ backgroundImage: `url(${courseImg})` }}
      className={`h-[400px] rounded relative bg-no-repeat bg-cover bg-center`}
    >
      <div className="inset-0 absolute bg-gradient-to-t from-base-100/80">
        <div className="w-full absolute bottom-0">
          <div className="grid justify-start">
            <div className="text-xl font-bold p-2">{courseTitle}</div>
            <div className="text-sm font-normal text-white p-2">
              {briefInfo}
            </div>
            <div className="text-lg font-normal text-white xl:text-3xl"></div>
            <div className="flex gap-3 p-2">
              <div className="flex gap-2">
                <img className="rounded-full w-14 h-14" src={authorImg}></img>
                <div className="text-lg my-auto font-normal text-base-content p-2">
                  {author}
                  <div className="text-sm">{job}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
