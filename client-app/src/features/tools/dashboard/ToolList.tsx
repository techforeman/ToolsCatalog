import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { ITool } from '../../../app/models/tool'


interface IProps {
    tools: ITool[];
    selectTool: (id: string) => void;
    deleteTool:(id: string) => void;
    submitting:boolean;
}

const ToolList: React.FC<IProps> = ({ tools, selectTool, deleteTool, submitting }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {tools && tools.map(tool => (
                    <Item key={tool.id}>
                    <Item.Content>
                        <Item.Header as='a'>{tool.name}</Item.Header>
                        <Item.Meta>{tool.createdOn}</Item.Meta>
                        <Item.Description>
                            <div>{tool.description}</div>
                            <div>{tool.category}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button loading={submitting} onClick={() => deleteTool(tool.id)} floated='right' content='Delete' color='red' />
                            <Button onClick={() => selectTool(tool.id)} floated='right' content='View' color='blue' />
                            <Label basic content='Category' />
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}

            </Item.Group>
        </Segment>

    );
};
export default ToolList
