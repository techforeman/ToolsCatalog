import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/128_logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Tools Catalog
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header as="h2" inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to="/tools" size="huge" inverted>
              Go To Dashboard
            </Button>
          </Fragment>
        ) : (
            <Fragment>
            <Header as="h2" inverted content={`Welcome to Tools Catalog`} />
            <Button onClick={() => openModal(<LoginForm/>)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm/>)} size="huge" inverted>
              Register
            </Button>
          </Fragment> 
        )}
      </Container>
    </Segment>
  );
};
export default HomePage;
