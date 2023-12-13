import {
  Admin,
  Resource,
  EditGuesser,
  Datagrid,
  DateField,
  List,
  TextField,
  NumberField,
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
  Show,
  SimpleShowLayout,
  ShowButton,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from "@mui/icons-material/LocalOffer";

export const PostFilterSidebar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
    <CardContent>
      <SavedQueriesList />
      <FilterLiveSearch />
      <FilterList label="Bot" icon={<MailIcon />}>
        <FilterListItem label="Yes" value={{ has_newsletter: true }} />
        <FilterListItem label="No" value={{ has_newsletter: false }} />
      </FilterList>
      <FilterList label="Category" icon={<CategoryIcon />}>
        <FilterListItem label="Infant" value={{ category: "infant" }} />
        <FilterListItem label="Toddler" value={{ category: "toddler" }} />
        <FilterListItem label="Child" value={{ category: "child" }} />
        <FilterListItem label="Preteen" value={{ category: "preteen" }} />
        <FilterListItem label="Teen" value={{ category: "teen" }} />
        <FilterListItem label="Adult" value={{ category: "adult" }} />
        <FilterListItem label="Household" value={{ category: "household" }} />
        <FilterListItem label="Relatives" value={{ category: "relatives" }} />
        <FilterListItem label="Other" value={{ category: "other" }} />
      </FilterList>
    </CardContent>
  </Card>
);

export const PostList = () => (
  <List aside={<PostFilterSidebar />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="category" />
      <NumberField source="viewCount" />
      <NumberField source="voteCount" />
      <NumberField source="answerCount" />
      <DateField source="createdAt" />
      <ShowButton />
    </Datagrid>
  </List>
);
export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="category" />
    </SimpleShowLayout>
  </Show>
);

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="questions"
      list={PostList}
      edit={EditGuesser}
      show={PostShow}
    />
  </Admin>
);
