import React, { useContext } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { observer} from 'mobx-react-lite';
import ToolStore from '../../../app/stores/toolStore';
import { Link } from "react-router-dom";



const ToolList: React.FC = () => {
  const toolStore  = useContext(ToolStore);
  const {toolsByCreateOn, deleteTool, submitting, target} = toolStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {toolsByCreateOn.map((tool) => (
            <Item key={tool.id}>
              <Item.Content>
                <Item.Header as="a">{tool.name}</Item.Header>
                <Item.Meta>{tool.createdOn}</Item.Meta>
                <Item.Description>
                  <div>{tool.description}</div>
                  <div>{tool.category}</div>
                </Item.Description>
                <Item.Extra>
                  <Button
                  name={tool.id}
                    loading={target === tool.id && submitting}
                    onClick={(e) => deleteTool(e, tool.id)}
                    floated="right"
                    content="Delete"
                    color="red"
                  />
                  <Button
                    
                    as={Link} to={`/tools/${tool.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Label basic content="Category" />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
      </Item.Group>
    </Segment>
  );
};
export default observer (ToolList);
