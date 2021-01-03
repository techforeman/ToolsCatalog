import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { ITool } from "../models/tool";
import NavBar from "../../features/nav/NavBar";
import ToolDashboard from "../../features/tools/dashboard/ToolDashboard";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";

const App = () => {
  const [tools, setTools] = useState<ITool[]>([]);
  const [selectedTool, setSelectedTool] = useState<ITool | null>(null);
  const [editMode, setEditMode] = useState(false);
const [loading, setLoading] = useState(true);
const [submitting, setSubmitting] = useState(false);

  const handleSelectTool = (id: string) => {
    setSelectedTool(tools.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedTool(null);
    setEditMode(true);
  }

  const handleCreateTool = (tool: ITool) => {
    setSubmitting(true);
    agent.Tools.create(tool).then(() => {
      setTools([...tools, tool]);
    setSelectedTool(tool);
    setEditMode(false);
    }).then(() => setSubmitting(false))
    
  }

  const handleEditTool = (tool: ITool) => {
    setSubmitting(true);
    agent.Tools.update(tool).then(() => {
      setTools([...tools.filter(a => a.id !== tool.id), tool]);
    setSelectedTool(tool);
    setEditMode(false);
    }).then(() => setSubmitting(false))
    
  }

  const handleDeleteTool = (id: string) => {
    setSubmitting(true);
    agent.Tools.delete(id).then(() => {
      setTools([...tools.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false))
    
  }
  useEffect(() => {
    agent.Tools.list()
      .then(response => {
        let tools: ITool[] = [];
        response.forEach((tool) => {
          tool.createdOn = tool.createdOn.split('/')[0];
          tools.push(tool);
        })
        setTools(tools);
      }).then(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponents content='Loading tools...' /> 

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
};

export default App;
