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
import UpdateWaitingForm from "./UpdateWaitingForm.jsx";
import NotFound from "../components/NotFound.jsx";

// user context - for logged in user
export const UserContext = createContext();

// waiting forms context - for pending forms
export const WaitingFormsContext = createContext();
const App = () => {
  // state for loggedin user
  const [loggedInUser, setLoggedInUser] = useState({});
  // state for waiting forms user
  const [waitingAllForms, setWaitingAllForms] = useState({});
  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <WaitingFormsContext.Provider
          value={[waitingAllForms, setWaitingAllForms]}
        >
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
              <PrivateRoute exact path="/details/:userid/update/:formid">
                <UpdateWaitingForm />
              </PrivateRoute>
              <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </WaitingFormsContext.Provider>
      </UserContext.Provider>
    </div>
  );
};
export default App;
