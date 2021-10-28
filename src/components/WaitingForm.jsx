import React from "react";
import styles from "../styles/UserProfile.module.css";
import { BsStopwatch } from "react-icons/bs";
import { MdOutlinePublic } from "react-icons/md";
import { db } from "../Firebase/config";
import { Link } from "react-router-dom";

const WaitingForm = ({ filteredData, loggedInUser, forms, bool }) => {
  // delete single waiting form from database
  const deleteTodo = (item) => {
    db.collection(forms).doc(item).delete();
  };

  return (
    <>
      <div className={styles.waiting__form__area}>
        <button>
          {bool ? (
            <>
              <BsStopwatch className={styles.icon__watch} />
              <span>Waiting for accepted.</span>
            </>
          ) : (
            <>
              <MdOutlinePublic className={styles.icon__watch} />
              <span>Your forms - (Public).</span>
            </>
          )}
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
                  to={
                    bool
                      ? `/details/${loggedInUser.login}/update/${item.id}`
                      : `/details/${loggedInUser.login}/updates/${item.id}`
                  }
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
