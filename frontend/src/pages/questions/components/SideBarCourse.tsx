export const SideBarCourse = ({
  courseTitle,
  courseImg,
  briefInfo,
  authorImg,
  author,
  job,
}: any) => (
  <div className="pb-8">
    <div
      style={{ backgroundImage: `url(${courseImg})` }}
      className={`h-[200px] rounded relative bg-no-repeat bg-cover bg-center`}
    >
      <div>
        <div className="w-[400px]">
          <div className="grid justify-start p-2">
            <div className="text-xl font-bold pt-2 text-white">
              {courseTitle}
            </div>
            <div className="text-sm font-normal text-white pt-2 ipad:text-base">
              {briefInfo}
            </div>
            <div className="text-lg font-normal text-white xl:text-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
// inset-0 absolute bg-gradient-to-t from-base-300/60
