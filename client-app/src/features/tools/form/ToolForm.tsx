import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { ITool } from "../../../app/models/tool";
import { v4 as uuid } from "uuid";
import ToolStore from "../../../app/stores/toolStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const ToolForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const toolStore = useContext(ToolStore);
  const {
    createTool,
    editTool,
    submitting,
    tool: initialFormState,
    loadTool,
    clearTool
  } = toolStore;


  const [tool, setTool] = useState<ITool>({
    id: "",
    name: "",
    description: "",
    category: "",
    createdOn: "",
    createdBy: "",
  });

  useEffect(() => {
    if (match.params.id && tool.id.length === 0) {
      loadTool(match.params.id).then(
        () => initialFormState && setTool(initialFormState)
      );
    }
    return () => {
      clearTool()
    }
  }, [loadTool, clearTool, match.params.id, initialFormState, tool.id.length]);

  const handleSubmit = () => {
    if (tool.id.length === 0) {
      let newTool = {
        ...tool,
        id: uuid(),
      };
      createTool(newTool).then(() => history.push(`/tools/${newTool.id}`));
    } else {
      editTool(tool).then(() => history.push(`/tools/${tool.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTool({ ...tool, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={tool.name}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={tool.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          alue={tool.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="createdOn"
          type="datetime-local"
          placeholder="Created On"
          value={tool.createdOn}
        />
        <Form.Input
          onChange={handleInputChange}
          name="createdBy"
          placeholder="Created By"
          value={tool.createdBy}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/tools') }
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default observer(ToolForm);
