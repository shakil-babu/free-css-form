import MainNavbar from "./Navbar.jsx";
import "../styles/Global.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Create from "./CreatePage/Create.jsx";
import Footer from "./Footer.jsx";
import React, { createContext, useEffect, useState } from "react";
import Signin from "./Signin.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import UserProfile from "./UserProfile.jsx";
import UpdateWaitingForm from "./UpdateWaitingForm.jsx";
import UpdateAcceptedForms from "./UpdateAcceptedForms";
import NotFound from "../components/NotFound.jsx";
import SecureAdmin from "./SecureAdmin.jsx";
import ConfirmForms from "./ConfirmForms.jsx";
import { db } from "../Firebase/config.js";
import ViewFormDetails from "./ViewFormDetails.jsx";
import Profile from "./Profile.jsx";
import loader from "../images/loader.gif";
// user context - for logged in user
export const UserContext = createContext();

// waiting forms context - for pending forms
export const WaitingFormsContext = createContext();

// accepted forms context - for accepted forms
export const AcceptedFormsContext = createContext();

// random word context
export const RandomWordContext = createContext();

const App = () => {
  // state for loggedin user
  const [loggedInUser, setLoggedInUser] = useState({});
  // state for waiting forms user
  const [waitingAllForms, setWaitingAllForms] = useState([]);

  // state for accepted forms
  const [acceptedAllForms, setAcceptedAllForms] = useState([]);

  // state for random word
  const [rw, setRw] = useState("");

  // get waiting forms from databse
  const getData = () => {
    db.collection("waiting-forms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setWaitingAllForms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar_url: doc.data().avatar_url,
            loggedInUser: doc.data().loggedInUser,
            html: doc.data().html,
            css: doc.data().css,
          }))
        );
      });
  };

  // get acceptedforms data
  const getAcceptedData = () => {
    db.collection("accepted-forms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setAcceptedAllForms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar_url: doc.data().avatar_url,
            loggedInUser: doc.data().loggedInUser,
            html: doc.data().html,
            css: doc.data().css,
          }))
        );
      });
  };
  // useEffect for function calling
  useEffect(() => {
    getData();
    getAcceptedData();
  }, []);

  // loader state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader__fullscreen__app">
          <img src={loader} alt="loader-img" />
        </div>
      ) : (
        <>
          <AcceptedFormsContext.Provider
            value={[acceptedAllForms, setAcceptedAllForms]}
          >
            <RandomWordContext.Provider value={[rw, setRw]}>
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

                      <Route exact path="/user/:user" component={Profile} />
                      <Route exact path="/auth/sign-in" component={Signin} />
                      <PrivateRoute exact path="/profile/:id">
                        <UserProfile />
                      </PrivateRoute>
                      <Route exact path="/view/:userid/:formid">
                        <ViewFormDetails />
                      </Route>
                      <PrivateRoute
                        exact
                        path="/details/:userid/update/:formid"
                      >
                        <UpdateWaitingForm />
                      </PrivateRoute>
                      <PrivateRoute
                        exact
                        path="/details/:userid/updates/:formid"
                      >
                        <UpdateAcceptedForms />
                      </PrivateRoute>
                      <PrivateRoute exact path={`/secure/${rw}/admin`}>
                        <SecureAdmin />
                      </PrivateRoute>
                      <PrivateRoute exact path={`/secure/admin/confirm/:id`}>
                        <ConfirmForms />
                      </PrivateRoute>
                      <Route path="*" component={NotFound} />
                    </Switch>
                    <Footer />
                  </BrowserRouter>
                </WaitingFormsContext.Provider>
              </UserContext.Provider>
            </RandomWordContext.Provider>
          </AcceptedFormsContext.Provider>
        </>
      )}
    </div>
  );
};
export default App;
