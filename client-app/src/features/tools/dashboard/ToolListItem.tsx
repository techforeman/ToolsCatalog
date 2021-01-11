import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item,  Segment } from "semantic-ui-react";
import { ITool } from "../../../app/models/tool";

const ToolListItem: React.FC<{ tool: ITool }> = ({ tool }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{tool.name}</Item.Header>
              <Item.Description>
                Hosted by Rojan
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
          <Icon name='clock'/> {tool.createdOn}
          <Icon name='user'/> {tool.createdBy}
      </Segment>
      <Segment secondary>User will check it</Segment>
      <Segment clearing>
                  <span>{tool.description}</span>
                  <Button
                  as={Link}
                  to={`/tools/${tool.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
      </Segment>
    </Segment.Group>
  );
};

export default ToolListItem;
