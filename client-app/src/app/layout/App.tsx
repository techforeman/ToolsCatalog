import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ToolDashboard from "../../features/tools/dashboard/ToolDashboard";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ToolForm from "../../features/tools/form/ToolForm";
import ToolDetails from "../../features/tools/details/ToolDetails";
import { observer } from "mobx-react-lite";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/tools" component={ToolDashboard} />
              <Route path="/tools/:id" component={ToolDetails} />
              <Route
                key={location.key}
                path={["/createTool", "/manage/:id"]}
                component={ToolForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
