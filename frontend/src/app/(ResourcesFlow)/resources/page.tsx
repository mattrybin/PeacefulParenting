export default function Page() {
  return (
    <div className="p-3">
      <div>
        <div className="text-base-content text-xl">
          <i className="ph-bold ph-book-open-text"></i> Books
        </div>
        <Book
          ImgLink="https://m.media-amazon.com/images/I/61YnzoPl9jL._AC_UF894,1000_QL80_.jpg"
          BookTitle="The Whole-Brain Child"
          Author="by Daniel J. Siegel and Tina Payne Bryson"
          BriefInfo=" 12 Revolutionary Strategies to Nurture Your Child's Developing
      Mind, Survive Everyday Parenting Struggles, and Help Your Family
      Thrive"
        />
        <Book
          ImgLink="https://m.media-amazon.com/images/I/71TWKixwzWL._AC_UF1000,1000_QL80_.jpg"
          BookTitle="Raising Good Humans"
          Author="by Daniel J. Siegel and Tina Payne Bryson"
          BriefInfo=" A Mindful Guide to Breaking the Cycle of Reactive Parenting and
      Raising Kind, Confident Kids"
        />
        <Book
          ImgLink="https://m.media-amazon.com/images/I/714tZOK0ITL._AC_UF894,1000_QL80_.jpg"
          BookTitle="The Book You Wish Your Parents Had Read"
          Author="by Philippa Perry"
          BriefInfo="  This book is about how we have relationships with our children,
      what gets in the way of a good connection and what can enhance it"
        />
        <Book
          ImgLink="https://m.media-amazon.com/images/I/61NeGbCiarL._AC_UF1000,1000_QL80_.jpg"
          BookTitle="Parenting from the Inside Out"
          Author="by Daniel J. Siegel and Mary Hartzell"
          BriefInfo=" This book focuses on how your own experiences and emotional
      well-being as a parent can impact your parenting style."
        />
        <Book
          ImgLink="https://m.media-amazon.com/images/I/611giknqqrL._AC_UF1000,1000_QL80_.jpg"
          BookTitle="No Bad Kids"
          Author="by Janet Lansbury"
          BriefInfo="Book about common toddler behaviors and how respectful parenting
      practices can be applied to benefit both parents and children."
        />
      </div>
      <div>
        <div className="text-base-content text-xl">
          <i className="ph-bold ph-certificate"></i> Courses
        </div>
        <Course
          CourseTitle="Everyday Parenting: The ABCs of Child Rearing"
          CourseImg="https://i0.wp.com/alankazdin.com/wp-content/uploads/2017/07/holding-hands.png?fit=1200%2C534&ssl=1"
          BriefInfo=" gives you access to a toolkit of behavior-change techniques that
          will make your typical day in the home easier as you develop the
          behaviors you would like to see in your child."
          AuthorImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgLyhLOAYomtjyAli4bBD1LILRmxriMXroqYgzp1_zML0Un9I8unyOjgfeaQoorCEKkR8&usqp=CAU2"
          Author="Alan E. Kazdin"
          Job="Proffesor of Psychology/Child Psychiatry"
        />
        <Course
          CourseTitle="ADHD: Everyday Strategies for Elementary Students"
          CourseImg="/funny-boy-whatever.jpg"
          BriefInfo="This course will provide an overview of ADHD diagnosis and treatment. Course participants can expect to learn about ADHD as a developmental disorder that begins early in childhood, and participants will also learn about evidence-based approaches for diagnosing ADHD. "
          AuthorImg="data:image/jpeg;base64,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"
          Author="Greg Fabiano"
          Job="Professor of School/Educational Psychology"
        />
        <Course
          CourseTitle="Resilience in Children Exposed to Trauma, Disaster and War: Global Perspectives"
          CourseImg="/dark-children.jpg"
          BriefInfo="How do children overcome hazardous experiences to succeed in life? What can be done to protect young people at risk from trauma, war, disasters, and other adversities? Learn about the importance of fostering resilience in children at risk. "
          AuthorImg="https://pbs.twimg.com/profile_images/460393822417997824/3hqpCEmi_400x400.jpeg"
          Author="Ann S. Masten"
          Job="Professor of Child Development"
        />
      </div>
      <div className="text-base-content py-5 text-xl">
        <i className="ph-bold ph-video"></i> Youtube channels
        <YTchannel
          Name="WhatsUpMoms"
          ChannelImg="https://i1.feedspot.com/4808931.jpg?t=1623162445"
          Subscribers="3.8M subscribers"
          Location="Los Angeles, CA"
          About=" Created by moms, we aim to inspire, inform, and hopefully make you
          laugh- the kind of relieving 'phew, someone else gets it' kind of
          laugh."
        />
        <YTchannel
          Name="TheDadLab"
          ChannelImg="https://yt3.googleusercontent.com/ytc/AIf8zZSjouqKiuLRwZU4qACC6eZ_V8WIex5DsVIA_tY=s176-c-k-c0x00ffffff-no-rj"
          Subscribers="5.19M subscribers"
          Location="London, England, UK"
          About="Provides educational and creative activities for parents to do with their children."
        />
        <YTchannel
          Name="FirstCry Parenting"
          ChannelImg="https://yt3.googleusercontent.com/ytc/AIf8zZS6XtwLqkK0gxzU-lVbTR9wY7ALDyDJqLVLNL_J=s176-c-k-c0x00ffffff-no-rj"
          Subscribers="1.42M"
          Location="India"
          About="We help you navigate your way through parenthood with expert parenting and baby care tips. Whether it's tracking your pregnancy week by week, or planning your child's diet, we have you covered."
        />
      </div>
    </div>
  );
}

const YTchannel = ({ Name, Location, About, Subscribers, ChannelImg }: any) => (
  <div className="py-5">
    <div className="text-white text-xl font-bold">{Name}</div>
    <div className="text-base text-white flex gap-2">
      <img className="w-32 h-32 rounded-lg" src={ChannelImg}></img>

      <div className=" h-max mt-20 text-base-300">
        <div>
          <i className="ph-bold ph-map-pin"></i>
          {Location}
        </div>
        <div>
          <i className="ph-bold ph-users"></i> {Subscribers}
        </div>
      </div>
    </div>
    <div className="p-3 text-white">{About}</div>
  </div>
);

const Course = ({
  CourseTitle,
  CourseImg,
  BriefInfo,
  AuthorImg,
  Author,
  Job,
}: any) => (
  <div className="py-10">
    <div className="text-xl font-bold xl:text-4xl">
      {CourseTitle}
      <div className="h-44 rounded-lg flex bg-base-100 ipad:h-[400px] xl:h-[500px] 2xl:h-[650px]">
        <img
          className="mx-auto md:w-screen rounded-lg py-3"
          src={CourseImg}
        ></img>
      </div>
      <div className="text-lg font-normal text-white xl:text-3xl">
        {BriefInfo}
      </div>
      <div className="flex gap-3 p-2">
        <div className="flex mx-auto gap-2">
          <img
            className="rounded-full w-14 h-14 xl:w-24 xl:h-24"
            src={AuthorImg}
          ></img>

          <div className="text-lg my-auto font-normal text-base-300 xl:text-2xl">
            {Author}
            <div className="text-sm xl:text-xl">{Job}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Book = ({ ImgLink, BookTitle, Author, BriefInfo }: any) => (
  <div className="flex gap-3 py-4">
    <div className="h-32 w-24">
      <img className="rounded-sm" src={ImgLink}></img>
    </div>
    <div className="w-[350px] text-2xl font-bold">
      {BookTitle}
      <div className="text-xs text-base-300 pt-1">
        {Author}
        <div className="text-white text-sm pt-1 font-normal">{BriefInfo}</div>
      </div>
    </div>
  </div>
);
