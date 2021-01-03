import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { ITool } from '../../../app/models/tool'

interface IProps {
    tool: ITool;
    setEditMode: (editMode:boolean) => void
    setSelectedTool: (tool: ITool | null) => void;
}

const ToolDetails: React.FC<IProps> = ({tool, setEditMode, setSelectedTool}) => {
    return (
        <Card fluid>
            <Image src='/assets/placeholder.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{tool.name}</Card.Header>
                <Card.Meta>
                    <span>{tool.createdOn}</span>
                </Card.Meta>
                <Card.Description>
                    {tool.description}
      </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit'/>
                    <Button onClick={() => setSelectedTool(null)} basic color='grey' content='Cancel'/>
                    
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
export default ToolDetails
