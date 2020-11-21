import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Home, Property, User, Profile,Terms } from "./pages";
import { Layout, ScrollTop, Error } from "./components";
import { PrivateRoute } from "./components";
import { history } from "./helpers";

function App() {
  return (
    <Router history={history}>
      <ScrollTop />
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/property" component={Property} />
          <Route path="/terms" component={Terms} />
          <PrivateRoute path="/user" component={User} />
          <Route path="/:username"  component={Profile} />
          <Route component={Error} />
          
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
