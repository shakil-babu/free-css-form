import MainNavbar from "./Navbar.jsx";
import "../styles/Global.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Create from "./CreatePage/Create.jsx";
import Footer from "./Footer.jsx";
import React, { createContext, useState } from "react";
import Signin from "./Signin.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import UserProfile from "./UserProfile.jsx";

// userContext
export const UserContext = createContext();
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <BrowserRouter>
          <MainNavbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/create">
              <Create />
            </PrivateRoute>
            <Route exact path="/auth/sign-in" component={Signin} />
            <PrivateRoute exact path="/profile/:id">
              <UserProfile />
            </PrivateRoute>
          </Switch>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};
export default App;
