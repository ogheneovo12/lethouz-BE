import React from "react";
import { useUserState } from "../../contexts";
import { Route, Redirect } from "react-router-dom";
import { roleType } from "../../constants";

// ONLY ACCESSIBLE BY USERS WHO ARE  LOGGED IN
export function PrivateRoute({ component: Component, roles, ...rest }) {
  const { isAuthenticated, user } = useUserState();
  let role = null;
  if (user) {
    role = user.isAdmin;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated && !user) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
        //check if route is restricted by role logged in user is allowed to access this path
        if (roles && roles.indexOf(roleType[role]) === -1) {
          return <Redirect to={{ pathname: "/app" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

// ONLY ACCESSIBLE BY USERS WHO ARE NOT LOGGED IN

export function PublicRoute({ component: Component, ...rest }) {
  const { isAuthenticated, user } = useUserState();
  return (
    <Route
      {...rest}
      render={(props) =>
        //if the user is logged in take them to app itself, else show
        isAuthenticated && user ? (
          <Redirect
            to={{
              pathname: "/app",
              state: {
                from: props.location,
              },
            }}
          />
        ) : (
          React.createElement(Component, props)
        )
      }
    />
  );
}
