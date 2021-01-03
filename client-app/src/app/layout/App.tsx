import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { ITool } from "../models/tool";
import NavBar from "../../features/nav/NavBar";
import ToolDashboard from "../../features/tools/dashboard/ToolDashboard";

const App = () => {
  const [tools, setTools] = useState<ITool[]>([]);
  const [selectedTool, setSelectedTool] = useState<ITool | null>(null);
  const [editMode, setEditMode] = useState(false);
  const handleSelectTool = (id: string) => {
    setSelectedTool(tools.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedTool(null);
    setEditMode(true);
  }

  const handleCreateTool = (tool: ITool) => {
    setTools([...tools, tool]);
    setSelectedTool(tool);
    setEditMode(false);
  }

   const handleEditTool = (tool: ITool) => {
     setTools([...tools.filter(a => a.id !== tool.id), tool]);
     setSelectedTool(tool);
      setEditMode(false);
     }

     const handleDeleteTool = (id: string) => {
      setTools([...tools.filter(a => a.id !== id)]);
 }
  useEffect(() => {
    axios.get<ITool[]>("https://localhost:5001/api/tools").then((response) => {
    let tools:ITool[] = [];  
    response.data.forEach(tool => {
      tool.createdOn = tool.createdOn.split('/')[0];
      tools.push(tool);
    })
    setTools(response.data);
    });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{ marginTop: "7em" }}>
        <ToolDashboard
          tools={tools}
          selectTool={handleSelectTool}
          selectedTool={selectedTool!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedTool={setSelectedTool}
          createTool={handleCreateTool}
          editTool={handleEditTool}
          deleteTool={handleDeleteTool}
        />
      </Container>
    </Fragment>
  );
};

export default App;
