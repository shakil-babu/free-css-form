import React, { useState, useContext } from "react";
import styles from "../styles/UserProfile.module.css";
import { UserContext, WaitingFormsContext } from "./App";
import { Link } from "react-router-dom";
import {
  FaLocationArrow,
  FaGithub,
  FaLink,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import WaitingForm from "./WaitingForm";
import AcceptedForms from "./AcceptedForms";
const UserProfile = () => {
  // logged in user context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [waitingAllForms, setWaitingAllForms] = useContext(WaitingFormsContext);
  // destructuring user info
  const {
    avatar_url,
    bio,
    blog,
    location,
    login,
    name,
    html_url,
    email,
    accessToken,
  } = loggedInUser;

  // filtered data for logged in user
  let filteredData = waitingAllForms.filter(
    (item, index) => item.loggedInUser.email === email
  );
  // for pending and accepted bar
  const [pending, setPending] = useState(true);

  // sign out
  const signOut = () => {
    setLoggedInUser({});
    // localStorage.removeItem("user");
  };
  return (
    <>
      <section className={`container ${styles.user_profile_area}`}>
        <div className={styles.user_profile}>
          <img src={avatar_url} alt="user-img" />
          <div className={styles.user_info}>
            <h3>
              {login}({name})
            </h3>
            <h5>{bio}</h5>
            <p>
              <FaLocationArrow className={styles.icon} /> {location}
            </p>
            <a href={html_url} target="_blank">
              <FaGithub className={styles.icon} />
              {login}
            </a>
            <a href={blog || "#"} target="_blank">
              <FaLink className={styles.icon} /> {blog || ""}
            </a>
            <div className={styles.btn_flex}>
              <Link to="/create">
                <button>
                  <FaPlus className={styles.icon} /> Create
                </button>
              </Link>
              <button onClick={signOut}>
                <FaSignOutAlt className={styles.icon} /> Log out
              </button>
            </div>
          </div>
        </div>

        {/* waiting and accepted bar */}
        <div className={styles.waiting__accepted__btns}>
          <button
            onClick={() => setPending(true)}
            className={pending && styles.pending__true}
          >
            Pending
          </button>
          <button
            onClick={() => setPending(false)}
            className={!pending && styles.pending__true}
          >
            Accepted
          </button>
        </div>
        {/* ================== user waiting work ============================= */}
        {pending ? (
          <div>
            {filteredData.length > 0 ? (
              <WaitingForm
                loggedInUser={loggedInUser}
                filteredData={filteredData}
              />
            ) : (
              <div className={styles.no__pending__forms}>
                <h4>You've no pending forms ever!</h4>
              </div>
            )}
          </div>
        ) : (
          <AcceptedForms />
        )}
      </section>
    </>
  );
};

export default UserProfile;
