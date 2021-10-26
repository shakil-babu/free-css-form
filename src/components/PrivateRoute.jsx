import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./App";
const PrivateRoute = ({ children, ...rest }) => {
  // from context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/sign-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
