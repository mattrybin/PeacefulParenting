import {
  Admin,
  Resource,
  EditGuesser,
  ShowGuesser,
  Datagrid,
  DateField,
  List,
  TextField,
  NumberField,
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from "@mui/icons-material/LocalOffer";

export const items = [
  { id: "infant", icon: "egg-crack", title: "Infant", subtitle: "0-1 Years" },
  { id: "toddler", icon: "baby", title: "Toddler", subtitle: "1-3 Years" },
  { id: "child", icon: "tooth", title: "Child", subtitle: "3-8 Years" },
  { id: "preteen", icon: "backpack", title: "Preteen", subtitle: "9-12 Years" },
  {
    id: "teen",
    icon: "person-simple-throw",
    title: "Teen",
    subtitle: "13-16 Years",
  },
  {
    id: "adult",
    icon: "graduation-cap",
    title: "Adult",
    subtitle: "17-21 Years",
  },
  {
    id: "household",
    icon: "house-line",
    title: "Household",
    subtitle: "Parents & kids",
  },
  {
    id: "relatives",
    icon: "users-three",
    title: "Relatives",
    subtitle: "Beyond home",
  },
  { id: "other", icon: "users-three", title: "Other", subtitle: "" },
];

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
    </Datagrid>
  </List>
);

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="questions"
      list={PostList}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
