import React, { useContext } from "react";
import styles from "../styles/UserProfile.module.css";
import { UserContext } from "./App";
import { Link } from "react-router-dom";
import {
  FaLocationArrow,
  FaGithub,
  FaLink,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
const UserProfile = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
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
              <button>
                <FaSignOutAlt className={styles.icon} /> Log out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
