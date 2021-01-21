import { format } from 'date-fns'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { ITool } from '../../../app/models/tool'

 const ToolDetailedInfo: React.FC<{tool:ITool}> = ({tool}) => {
    return (
        <Segment.Group>
        <Segment attached='top'>
          <Grid>
            <Grid.Column width={1}>
              <Icon size='large' color='teal' name='info' />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{tool.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='calendar' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={15}>
            <span>Created on: {format(tool.createdOn, 'eee do MMMM')}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='marker' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>Category: {tool.category}</span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
  
    )
}
export default observer (ToolDetailedInfo)
