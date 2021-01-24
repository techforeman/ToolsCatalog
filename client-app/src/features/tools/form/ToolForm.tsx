import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import {  ToolFormValues } from "../../../app/models/tool";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { category } from "../../../app/common/options/categoryOptions";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan} from 'revalidate';
import { RootStoreContext } from "../../../app/stores/rootStore";


const validate = combineValidators({
  name: isRequired({message: 'The name of the tool is required'}),
  category: isRequired({message: 'The category of the tool is required'}),
  description: composeValidators(isRequired('Description of the tool is required'), hasLengthGreaterThan(4)({message: 'Description needs to be at least 10 characters'}))(),
  createdOn: isRequired('Date of creation is required'),
  createdOnTime: isRequired('Time of creation is required'),
  createdBy: isRequired('Author of the tool is required'),

})

interface DetailParams {
  id: string;
}

const ToolForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createTool,
    editTool,
    submitting,
    loadTool,
  } = rootStore.toolStore;

  const [tool, setTool] = useState(new ToolFormValues());
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadTool(match.params.id).then(
        (tool) => setTool(new ToolFormValues(tool))
      ).finally(() => setLoading(false));
    }
  }, [loadTool, match.params.id]);

 
  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.createdOn, values.createdOnTime);
    const {createdOn, createdOnTime, ...tool} = values;
    tool.createdOn = dateAndTime;
    if (!tool.id) {
      let newTool = {
        ...tool,
        id: uuid(),
      };
      createTool(newTool);
    } else {
      editTool(tool);
    }
  };


  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing >
          <FinalForm
          validate={validate}
          initialValues = {tool}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form loading={loading} onSubmit={handleSubmit}>
                <Field
                  name="name"
                  placeholder="Name"
                  value={tool.name}
                  component={TextInput}
                />
                <Field
                  name="description"
                  rows={3}
                  placeholder="Description"
                  value={tool.description}
                  component={TextAreaInput}
                />
                <Field    
                  name="category"
                  options={category}
                  placeholder="Category"
                  value={tool.category}
                  component={SelectInput}
                />
                <Form.Group>
                <Field
                  name="createdOn"
                  placeholder="Created On"
                  value={tool.createdOn}
                  date={true}
                  component={DateInput}
                />
                  <Field
                  name="createdOnTime"
                  placeholder="Time"
                  value={tool.createdOnTime}
                  component={DateInput}
                  time={true}
                />
                  </Form.Group>
                
                <Field
                  name="createdBy"
                  placeholder="Created By"
                  value={tool.createdBy}
                  component={TextInput}
                />
                <Button
                disabled = {loading || invalid || pristine}
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                disabled = {loading}
                  onClick={tool.id ? () => history.push(`/tools/${tool.id}`) : () => history.push("/tools")}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ToolForm);
