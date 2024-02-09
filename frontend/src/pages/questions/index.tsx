// import { useQuestions } from "./page.hook"
// import { getQuestions } from "app/testing"
import { PageContainer } from "shared/components/Containers";
import { getQuestions } from "shared/queries/questions";
import { List } from "./components/List";

const array = [{ id: "2342" }];
export default async function HomePage() {
  const { data, count } = await getQuestions({});
  return (
    <PageContainer>
      {/* <MyComponent /> */}
      {/* <QuestionsHeader {...header} />
      // <Tabs {...tabs} /> */}
      <List questions={array} isEmpty={count === 0} />
      {/* <Pagination {...pagination} /> */}
    </PageContainer>
  );
}
