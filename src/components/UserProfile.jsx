import React, { useContext, useEffect } from "react";
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
import { BsStopwatch } from "react-icons/bs";
import { useState } from "react/cjs/react.development";
import { db } from "../Firebase/config";
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

  // user pending design
  const [waitingForms, setWaitingForms] = useState([]);
  const getData = () => {
    db.collection("waiting-forms").onSnapshot((snapshot) => {
      setWaitingForms(
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

  useEffect(() => {
    getData();
  }, []);

  // for logged in user
  let filteredData = waitingForms.filter(
    (item, index) => item.loggedInUser.email === email
  );

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
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
              <button onClick={() => setLoggedInUser({})}>
                <FaSignOutAlt className={styles.icon} /> Log out
              </button>
            </div>
          </div>
        </div>

        {/* ================== user waiting work ============================= */}
        <div className={styles.waiting__form__area}>
          <button>
            <BsStopwatch className={styles.icon__watch} /> Your form -{" "}
            <span>Waiting for accepted.</span>
          </button>
          {filteredData.map((item, index) => {
            let srcDoc = `
          <html>
              <body>${item.html}</body>
              <style>${item.css}</style>
          </html>
      `;
            return (
              <div className={styles.waiting__single__form}>
                <h2>
                  <button>{index + 1}</button>
                </h2>
                <iframe
                  className={styles.output__iframe}
                  srcDoc={srcDoc}
                  frameborder="0"
                  width="100%"
                  height="100%"
                  title="Output"
                  sandbox="allow-scripts"
                ></iframe>

                <div className={styles.action__btns}>
                  <button>Update</button>
                  <button>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default UserProfile;
