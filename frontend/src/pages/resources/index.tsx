import { Book } from "./components/Book"
import { PageContainer, SectionContainer } from "./components/Containers"
import { Course } from "./components/Course"
import { HeaderSection } from "./components/HeaderSection"
import { YoutubeChannel } from "./components/YoutubeChannel"
import { books, courses, youtubechannels } from "./index.data"

export default function Page() {
  return (
    <PageContainer>
      <SectionContainer>
        <HeaderSection
          icon="book-open-text"
          title="Books"
        />
        <div className="grid gap-4 desktop:grid-cols-2 desktop:gap-x-8">
          {books.map((item, index) => (
            <Book
              key={index}
              {...item}
            />
          ))}
        </div>
      </SectionContainer>
      <SectionContainer>
        <HeaderSection
          icon="certificate"
          title="Courses"
        />
        <div className="grid gap-5 max-content">
          {courses.map((item, index) => (
            <Course
              key={index}
              {...item}
            />
          ))}
        </div>
      </SectionContainer>
      <SectionContainer>
        <HeaderSection
          icon="video"
          title="Youtube channels"
        />
        {youtubechannels.map((item, index) => (
          <YoutubeChannel
            key={index}
            {...item}
          />
        ))}
      </SectionContainer>
    </PageContainer>
  )
}
