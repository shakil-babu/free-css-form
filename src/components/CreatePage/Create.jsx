// import important files/components
import React, { useContext, useState } from "react";
import styles from "../../styles/Create.module.css";
import Editor from "./Editor";
import firebase from "firebase/compat/app";
import { db } from "../../Firebase/config";
import { UserContext } from "../App";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

// Component start from here
const Create = () => {
  // html,css state with default value
  const [html, setHtml] = useState(`<form action="">
Create here like your own.
</form>`);
  const [css, setCss] = useState(`form{

}
  `);

  // user information from logged in user (from context api)
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [submit, setSubmit] = useState(false);

  // default src doc which will contain html and css
  const srcDoc = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
    </html>
    `;

  // add content to database
  const addWaitingFormToDatafase = () => {
    db.collection("waiting-forms").add({
      html: html,
      css: css,
      loggedInUser,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setSubmit(true);
  };

  return (
    <>
      {/* ==================== editor showcase area =================== */}
      <section className={`${styles.create__area} container`}>
        <div className={styles.create__flex}>
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
        </div>

        {/* ================== Output area ========================== */}
        <div className={styles.output__area}>
          <h5>OUTPUT</h5>
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

        {/* ====================== Actions buttons =========================== */}
        <div className={styles.btn__flex}>
          <button className={styles.update__btn}>Update</button>
          {submit ? (
            <div>
              <p className={styles.submitted}>
                <FaCheck className={styles.submit_icon} /> Your code has been
                submit.
              </p>
              <Link
                className={styles.goto_profile}
                to={`/profile/${loggedInUser.login}`}
              >
                Go to your profile.
              </Link>
            </div>
          ) : (
            <button
              className={styles.submit__btn}
              onClick={addWaitingFormToDatafase}
            >
              Submit
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Create;
