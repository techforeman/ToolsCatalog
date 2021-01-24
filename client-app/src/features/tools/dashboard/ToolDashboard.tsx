import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ToolList from "./ToolList";
import { observer} from 'mobx-react-lite';
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { RootStoreContext } from "../../../app/stores/rootStore";



const ToolDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadTools, loadingInitial} = rootStore.toolStore;

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  if (loadingInitial)
    return <LoadingComponents content="Loading tools..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ToolList/>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Tool Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer (ToolDashboard);
