import React from "react";
import { Route, Switch } from "react-router-dom";
import Details from "./Details";
import AddProperty from "./AddProperty";
import Uploaded from "./Uploaded"
import Saved from "./Saved"
import { PrivateRoute, Error } from "../../components"
export function Property({ match }) {
  return (
    <div className="property">
      <Switch>
        {/* <Route path="/property" exact component={Details} /> */}
        <PrivateRoute path="/property/add" component={AddProperty} />
        <PrivateRoute path="/property/uploaded"  component={Uploaded} />
        <PrivateRoute path="/property/saved" component={Saved} />
        <Route path={`${match.path}/view/:id`} component={Details} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

Details.propTypes = {};
