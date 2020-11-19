import React from "react";
import { Route, Switch } from "react-router-dom";
import "./index.css";
//import PropTypes from 'prop-types'
import Profile from "./Profile";
import Account from "./Account/";
export function User(props) {
  return (
    <div>
      <Switch>
        <Route path="/user/profile" component={Profile} />
        <Route path="/user/account" component={Account} />
      </Switch>
    </div>
  );
}
