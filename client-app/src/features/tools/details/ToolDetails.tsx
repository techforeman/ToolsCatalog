import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import {  RouteComponentProps } from "react-router-dom";
import {  Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { RootStoreContext } from "../../../app/stores/rootStore";
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
  const rootStore = useContext(RootStoreContext);
  const {
    tool,
    loadTool,
    loadingInitial,
  } = rootStore.toolStore;

  useEffect(() => {
    loadTool(match.params.id)
  }, [loadTool, match.params.id, history]);

  if (loadingInitial)
    return <LoadingComponents content="Loading tool..." />;

    if(!tool)
      return <h2> Tool is not found</h2>

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
