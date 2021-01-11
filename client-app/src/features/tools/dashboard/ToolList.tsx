import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToolStore from "../../../app/stores/toolStore";
import ToolListItem from "./ToolListItem";

const ToolList: React.FC = () => {
  const toolStore = useContext(ToolStore);
  const { toolsByCreateOn } = toolStore;
  return (
    <Fragment>
      {toolsByCreateOn.map(([group, tools]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
            <Item.Group divided>
              {tools.map((tool) => (
                <ToolListItem key={tool.id} tool={tool} />
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};
export default observer(ToolList);
