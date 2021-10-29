import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { AcceptedFormsContext, UserContext } from "./App";
import Editor from "./CreatePage/Editor";
import styles from "../styles/Create.module.css";
import { db } from "../Firebase/config";
import firebase from "firebase/compat/app";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

// component start here
const UpdateWaitingForm = () => {
  const { formid } = useParams();
  // waitingFormsContext
  const [acceptedAllForms, setAcceptedAllForms] =
    useContext(AcceptedFormsContext);
  // user info
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [submit, setSubmit] = useState(false);
  // find actual data
  const finded = acceptedAllForms.find((item) => item.id === formid);

  const [html, setHtml] = useState(finded.html);
  const [css, setCss] = useState(finded.css);
  // src doc
  const srcDoc = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
    </html>
    `;

  // update single forms data
  const UpdateWaitingFormHanlder = () => {
    db.collection("accepted-forms").doc(finded.id).set(
      {
        html: html,
        css: css,
        loggedInUser,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setSubmit(true);
  };
  return (
    <>
      <section className={`${styles.create__area} container`}>
        <div className={styles.create__flex}>
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            bool={false}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            bool={false}
          />
        </div>

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
        <div className={styles.btn__flex}>
          <button className={styles.update__btn}></button>
          {submit ? (
            <div>
              <p className={styles.submitted}>
                <FaCheck className={styles.submit_icon} /> updated succesfully!
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
              onClick={UpdateWaitingFormHanlder}
            >
              Update
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default UpdateWaitingForm;
