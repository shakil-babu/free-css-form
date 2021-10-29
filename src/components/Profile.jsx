import React, { useContext, useEffect, useState } from "react";
import { FaGithub, FaLink, FaLocationArrow } from "react-icons/fa";
import { useParams, useHistory } from "react-router";
import styles from "../styles/UserProfile.module.css";
import { AcceptedFormsContext } from "./App";
import loader from "../images/loader.gif";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user } = useParams();
  const [acceptedAllForms, setAcceptedAllForms] =
    useContext(AcceptedFormsContext);

  // filtered accepted forms data for logged in use
  let filteredAcceptedData = acceptedAllForms.filter(
    (item, index) => item.loggedInUser.login === user
  );

  // user
  let userInfo = filteredAcceptedData[0];
  let {
    loggedInUser: { avatar_url, login, name, bio, html_url, blog, location },
  } = userInfo;

  // history
  let history = useHistory();
  // loader state
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <section className={`container ${styles.user_profile_area}`}>
        {loading ? (
          <div className={styles.loader__area__here}>
            <img src={loader} alt="loader" />
          </div>
        ) : (
          <>
            <div className={styles.user_profile}>
              <img src={avatar_url} alt="user-img" />
              <div className={styles.user_info}>
                <h3>
                  {name}({login})
                </h3>
                <h5>{bio}</h5>
                <p>
                  <FaLocationArrow className={styles.icon} /> {location}
                </p>
                <a href={html_url} target="_blank">
                  <FaGithub className={styles.icon} />
                  {login}
                </a>
                {blog && (
                  <a href={blog || "#"} target="_blank">
                    <FaLink className={styles.icon} /> {blog}
                  </a>
                )}
              </div>
            </div>

            {/* =================== user form's ================== */}
            <div className={styles.user__form__area__here}>
              <h4>
                Form's by @{login}({filteredAcceptedData.length})
              </h4>
              {filteredAcceptedData.map((item, index) => {
                let srcDoc = `
              <html>
                  <body>${item.html}</body>
                  <style>${item.css}</style>
              </html>
          `;
                return (
                  <div className={styles.user__form__div}>
                    <div className={styles.go__back__btn}>
                      <Link
                        style={{ marginBottom: "20px" }}
                        to={`/view/${item.loggedInUser.login}/${item.id}`}
                      >
                        <button>Visit</button>
                      </Link>
                    </div>
                    <iframe
                      className={styles.output__iframe}
                      srcDoc={srcDoc}
                      frameborder="0"
                      width="100%"
                      height="100%"
                      title="Output"
                      sandbox="allow-scripts"
                    ></iframe>
                  </div>
                );
              })}
            </div>

            {/* ===================== go back button ================== */}
            <div className={styles.go__back__btn}>
              <button onClick={() => history.goBack()}>Go back</button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Profile;
