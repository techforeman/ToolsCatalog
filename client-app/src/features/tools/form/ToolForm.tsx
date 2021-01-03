import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { ITool } from "../../../app/models/tool";
import {v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  tool: ITool;
  createTool: (tool: ITool) => void;
  editTool: (tool: ITool) => void;
}

const ToolForm: React.FC<IProps> = ({
  setEditMode,
  tool: initialFormState,
  createTool,
  editTool
}) => {
  const initialForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        name: "",
        description: "",
        category: "",
        createdOn: "",
        createdBy: "",
      };
    }
  };

  const [tool, setTool] = useState<ITool>(initialForm);

  const handleSubmit = () => {
      if (tool.id.length === 0) {
          let newTool = {
              ...tool,
              id: uuid()
          } 
          createTool(newTool);
         } else {
             editTool(tool);
         }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setTool({ ...tool, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit ={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='name'
          placeholder="Name"
          value={tool.name}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder="Description"
          value={tool.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder="Category"
          alue={tool.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name='createdOn'
          type="datetime-local"
          placeholder="Created On"
          value={tool.createdOn}
        />
        <Form.Input
          onChange={handleInputChange}
          name='createdBy'
          placeholder="Created By"
          value={tool.createdBy}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
export default ToolForm;
