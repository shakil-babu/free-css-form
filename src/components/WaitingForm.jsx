import React from "react";
import styles from "../styles/UserProfile.module.css";
import { BsStopwatch } from "react-icons/bs";
import { db } from "../Firebase/config";
import { Link } from "react-router-dom";

const WaitingForm = ({ filteredData, loggedInUser }) => {
  // delete single waiting form from database
  const deleteTodo = (item) => {
    db.collection("waiting-forms").doc(item).delete();
  };
  return (
    <>
      <div className={styles.waiting__form__area}>
        <button>
          <BsStopwatch className={styles.icon__watch} />
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
                <button>( {index + 1} )</button>
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
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/details/${loggedInUser.login}/update/${item.id}`}
                >
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() =>
                    window.confirm("Are you sure ?") && deleteTodo(item.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WaitingForm;
