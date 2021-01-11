import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react'

 const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
        <Container text>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/128_logo.png' alt='logo' style={{marginBottom: 12}}/>
                Tools Catalog
            </Header>
            <Header as='h2' inverted content='Welcome to Tools Catalog' />
            <Button as={Link} to='/tools' size='huge' inverted>
                Take me to the tools!
            </Button>
        </Container>
    </Segment>
    )
}
export default HomePage
