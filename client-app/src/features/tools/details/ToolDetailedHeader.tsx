import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react'
import { ITool } from '../../../app/models/tool';



const toolImageStyle = {
    filter: 'brightness(30%)'
  };
  
  const toolImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  };

 const ToolDetailedHeader:React.FC<{tool:ITool}> = ({tool}) => {
    return (
        <Segment.Group>
        <Segment basic attached='top' style={{ padding: '0' }}>
          <Image src={`/assets/placeholder.png`} fluid style={toolImageStyle}/>
          <Segment basic style={toolImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={tool.name}
                    style={{ color: 'white' }}
                  />
                  <p>{format(tool.createdOn, 'eee do MMMM')}</p>
                  <p>
                    Hosted by <strong>rojan</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached='bottom'>
          <Button color='teal'>Participate in creation of Tool</Button>
          <Button>Stop creating Tool</Button>
          <Button as={Link} to={`/manage/${tool.id}`}color='orange' floated='right'>
            Manage Tool
          </Button>
        </Segment>
      </Segment.Group>
    )
}
export default observer (ToolDetailedHeader)
