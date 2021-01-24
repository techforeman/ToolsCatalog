import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ToolListItem from "./ToolListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ToolList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { toolsByCreateOn } = rootStore.toolStore;
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
