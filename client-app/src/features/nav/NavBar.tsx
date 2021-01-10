import { observer } from 'mobx-react-lite';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'



const NavBar: React.FC = () => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/128_logo.png" alt = "logo" style={{marginRight:'10px'}}/>
                    Tools Catalog
                    </Menu.Item>
                <Menu.Item
                    name='Tools'
                    as={NavLink} to='/tools'
                />
                <Menu.Item>
                    <Button as={NavLink} to='/createTool' positive content="Create Tool" />
                    </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer (NavBar)