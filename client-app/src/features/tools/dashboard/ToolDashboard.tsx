import React from "react";
import { Grid } from "semantic-ui-react";
import { ITool } from "../../../app/models/tool";
import ToolDetails from "../details/ToolDetails";
import ToolForm from "../form/ToolForm";
import ToolList from "./ToolList";

interface IProps {
  tools: ITool[];
  selectTool: (id: string) => void;
  selectedTool: ITool | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedTool: (tool: ITool | null) => void;
  createTool: (tool: ITool) => void;
  editTool: (tool: ITool) => void;
  deleteTool:(id: string) => void;
}

const ToolDashboard: React.FC<IProps> = ({
  tools,
  selectTool,
  selectedTool,
  editMode,
  setEditMode,
  setSelectedTool,
  createTool,
  editTool,
  deleteTool
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ToolList tools={tools} selectTool={selectTool}  deleteTool={deleteTool}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedTool && !editMode && (
          <ToolDetails
            tool={selectedTool}
            setEditMode={setEditMode}
            setSelectedTool={setSelectedTool}
          />
        )}
        {editMode && (
          <ToolForm
          key={(selectedTool && selectedTool.id) || 0}
            setEditMode={setEditMode}
            tool={selectedTool!}
            editTool={editTool}
            createTool={createTool}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ToolDashboard;
