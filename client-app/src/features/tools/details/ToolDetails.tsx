import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ToolStore from "../../../app/stores/toolStore";

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
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{tool!.name}</Card.Header>
        <Card.Meta>
          <span>{tool!.createdOn}</span>
        </Card.Meta>
        <Card.Description>{tool!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/manage/${tool.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/tools')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ToolDetails);
