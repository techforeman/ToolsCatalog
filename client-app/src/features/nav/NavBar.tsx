import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface IProps {
    openCreateForm: () => void;
}
const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item>
                    <img src="/assets/128_logo.png" alt = "logo" style={{marginRight:'10px'}}/>
                    Tools Catalog
                    </Menu.Item>
                <Menu.Item
                    name='Tools'
                />
                <Menu.Item>
                    <Button onClick={openCreateForm} positive content="Create Tool" />
                    </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar