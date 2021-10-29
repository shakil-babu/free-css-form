import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RandomWordContext, WaitingFormsContext } from "./App";
import Editor from "./CreatePage/Editor";
import styles from "../styles/Create.module.css";
import { db } from "../Firebase/config";
import firebase from "firebase/compat/app";
const ConfirmForms = () => {
  const { id } = useParams();
  // random word context
  const [rw, setRw] = useContext(RandomWordContext);
  // waitingFormsContext
  const [waitingAllForms, setWaitingAllForms] = useContext(WaitingFormsContext);
  // find actual data
  const finded = waitingAllForms.find((item) => item.id === id);

  // html, css
  const [html, setHtml] = useState(finded.html);
  const [css, setCss] = useState(finded.css);

  // src doc
  const srcDoc = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
    </html>
    `;

  // ==================== action with database
  const [submit, setSubmit] = useState(false);
  // add content to database
  const addAcceptedFormToDatabase = () => {
    db.collection("accepted-forms").add({
      html: html,
      css: css,
      loggedInUser: finded.loggedInUser,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setSubmit(true);
  };

  let history = useHistory();

  // delete item for delete button
  const deleteItem = () => {
    history.push(`/secure/${rw}/admin`);
    db.collection("waiting-forms").doc(id).delete();
  };

  // useEffect method
  useEffect(() => {
    if (submit) {
      setTimeout(() => {
        deleteItem();
      }, 1000);
    }
  }, [submit]);
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

        <div className={styles.action__btn__flex__here}>
          <button
            onClick={addAcceptedFormToDatabase}
            className={submit && styles.confirmed__btn}
          >
            {submit ? "Confirmed" : "Confirm"}
          </button>
          <button
            onClick={() => window.confirm("Are you sure ?") && deleteItem()}
          >
            Detele
          </button>
        </div>
      </section>
    </>
  );
};

export default ConfirmForms;
