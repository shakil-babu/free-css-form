import React, { useContext } from "react";
import styles from "../styles/Signin.module.css";
import { AiFillGithub } from "react-icons/ai";
import githubAuthentication from "../Firebase/config";

// from react router dom
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "./App";

// component start here
const Signin = () => {
  // logged in user info
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // sign in handler
  const clickHandler = async () => {
    const res = await githubAuthentication();
    // let final = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(res);
    history.replace(from);
  };

  return (
    <>
      {/* ======================= sign in area ======================== */}
      <section className={styles.signin_area}>
        <button onClick={clickHandler} className={styles.signIn_btn}>
          <AiFillGithub className={styles.icon} /> Sign in with github
        </button>
      </section>
    </>
  );
};

export default Signin;
