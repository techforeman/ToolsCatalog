import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import {  RouteComponentProps } from "react-router-dom";
import {  Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ToolStore from "../../../app/stores/toolStore";
import ToolDetailedChat from "./ToolDetailedChat";
import ToolDetailedHeader from "./ToolDetailedHeader";
import ToolDetailedInfo from "./ToolDetailedInfo";
import ToolDetailedSidebar from "./ToolDetailedSidebar";

interface DetailParams {
  id: string;
}

const ToolDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const toolStore = useContext(ToolStore);
  const {
    tool,
    loadTool,
    loadingInitial,
  } = toolStore;

  useEffect(() => {
    loadTool(match.params.id);
  }, [loadTool, match.params.id]);

  if (loadingInitial || !tool)
    return <LoadingComponents content="Loading tool..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ToolDetailedHeader tool={tool}/>
        <ToolDetailedInfo tool={tool}/>
        <ToolDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
          <ToolDetailedSidebar/>
        </Grid.Column>
    </Grid>
  );
};
export default observer(ToolDetails);
