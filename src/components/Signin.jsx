import React, { useContext } from "react";
import styles from "../styles/Signin.module.css";
import { AiFillGithub } from "react-icons/ai";
import githubAuthentication from "../Firebase/config";
// from react router dom
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "./App";

const Signin = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  // sign in handler
  const clickHandler = async () => {
    const res = await githubAuthentication();

    // user info
    let user = res.additionalUserInfo.profile;
    let { avatar_url, bio, blog, location, login, name, html_url } = user;

    // for email
    let { email, accessToken } = res.user.multiFactor.user;

    // final information
    let finalInfo = {
      avatar_url,
      bio,
      blog,
      location,
      login,
      name,
      html_url,
      email,
      accessToken,
    };
    setLoggedInUser(finalInfo);
    history.replace(from);
  };
  console.log(loggedInUser);

  return (
    <>
      <section className={styles.signin_area}>
        <button onClick={clickHandler} className={styles.signIn_btn}>
          <AiFillGithub className={styles.icon} /> Sign in with github
        </button>
      </section>
    </>
  );
};

export default Signin;
