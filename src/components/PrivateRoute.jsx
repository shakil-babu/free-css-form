import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./App";

// start here
const PrivateRoute = ({ children, ...rest }) => {
  // logged in user information - from user context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  return (
    // ================ applying route ====================
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
