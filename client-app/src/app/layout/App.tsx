import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ToolDashboard from "../../features/tools/dashboard/ToolDashboard";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ToolForm from "../../features/tools/form/ToolForm";
import ToolDetails from "../../features/tools/details/ToolDetails";
import { observer } from "mobx-react-lite";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponents from "./LoadingComponents";
import ModalContainer from "../common/modals/ModalContainer";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext)
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;


useEffect(() => {
  if (token){
    getUser().finally(() => setAppLoaded());
  } else {
    setAppLoaded();
  }
  
}, [getUser, setAppLoaded, token])

if (!appLoaded) return <LoadingComponents content='Loading app ...'/>

  return (
    <Fragment>
      <ModalContainer></ModalContainer>
      <ToastContainer position='bottom-right'/>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
              <Route exact path="/tools" component={ToolDashboard} />
              <Route path="/tools/:id" component={ToolDetails} />
              <Route
                key={location.key}
                path={["/createTool", "/manage/:id"]}
                component={ToolForm}
              />
              <Route path='/login' component={LoginForm} />
              <Route component={NotFound} />
              
              </Switch>
              
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
