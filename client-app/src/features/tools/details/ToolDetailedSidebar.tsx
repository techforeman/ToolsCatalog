import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react'

 const ToolDetailedSidebar = () => {
    return (
        <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        3 People Using
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: 'relative' }}>
            <Label
              style={{ position: 'absolute' }}
              color='orange'
              ribbon='right'
            >
              Who is using
            </Label>
            <Image size='tiny' src={'/assets/user.png'} />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <Link to={`#`}>Robert</Link>
              </Item.Header>
              <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: 'relative' }}>
            <Image size='tiny' src={'/assets/user.png'} />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <Link to={`#`}>Tomek</Link>
              </Item.Header>
              <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: 'relative' }}>
            <Image size='tiny' src={'/assets/user.png'} />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <Link to={`#`}>Ania</Link>
              </Item.Header>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </Fragment>
    )
}

export default ToolDetailedSidebar
