import React from "react";
//import PropTypes from 'prop-types'
import { Route, Switch } from "react-router-dom";
import IndexPage from "./Account";
import Notification from "./Notification";
import Security from "./Security";
import Preferences from "./Preferences";

function Account(props) {
  return (
    <div style={{ marginTop: 40 }}>
      <Switch>
        <Route path="/user/account" exact component={IndexPage} />
        <Route path="/user/account/notifications" component={Notification} />
        <Route path="/user/account/security" component={Security} />
        <Route path="/user/account/preferences" component={Preferences} />
      </Switch>
    </div>
  );
}

Account.propTypes = {};

export default Account;
