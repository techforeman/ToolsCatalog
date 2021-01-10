import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ToolList from "./ToolList";
import { observer} from 'mobx-react-lite';
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ToolStore from "../../../app/stores/toolStore";



const ToolDashboard: React.FC = () => {
  const toolStore = useContext(ToolStore);

  useEffect(() => {
    toolStore.loadTools();
  }, [toolStore]);

  if (toolStore.loadingInitial)
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
