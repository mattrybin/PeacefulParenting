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
  CreateButton,
  TopToolbar,
  Create,
  SimpleForm,
  TextInput,
  required,
  SelectInput,
  DateInput,
  Edit,
  EditButton,
  ReferenceManyField,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from "@mui/icons-material/LocalOffer";
import { dataProvider } from "../dataProvider";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

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

export const questionList = () => (
  <List actions={<ListActions />} aside={<PostFilterSidebar />}>
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
export const questionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="category" />
    </SimpleShowLayout>
  </Show>
);

export const categories = [
  { id: "infant", name: "Infant" },
  { id: "toddler", name: "Toddler" },
  { id: "child", name: "Child" },
  { id: "preteen", name: "Preteen" },
  { id: "teen", name: "Teen" },
  { id: "adult", name: "Adult" },
  { id: "household", name: "Household" },
  { id: "relatives", name: "Relatives" },
  { id: "other", name: "Other" },
];

export const QuestionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} />
      <SelectInput
        source="category"
        choices={categories}
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);

export const questionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} />
      <SelectInput
        source="category"
        choices={categories}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);

export const Questions = () => (
  <Resource
    name="questions"
    list={questionList}
    edit={questionEdit}
    show={questionShow}
    create={QuestionCreate}
  />
);
