import React, { useContext } from "react";
import styles from "../styles/SecureAdmin.module.css";
import { WaitingFormsContext } from "./App";
import { Link } from "react-router-dom";
const SecureAdmin = () => {
  // waiting forms context
  let [waitingAllForms, setWaitingAllForms] = useContext(WaitingFormsContext);

  return (
    <>
      <div className="container">
        <section className={`${styles.secure___andmin__area}`}>
          <div className={styles.bar__area}>
            <h1>All Requests( {waitingAllForms.length} )</h1>
          </div>

          {waitingAllForms.length > 0 ? (
            <div className={styles.secure__user__grid}>
              {waitingAllForms?.map((item, index) => {
                return (
                  <div className={styles.single__user}>
                    <img src={item.loggedInUser.avatar_url} alt="" />
                    <div className={styles.single__user__content}>
                      <p>
                        <small>From : </small> {item.loggedInUser.login}
                      </p>
                      <p>{item.loggedInUser.email}</p>
                      <a href={item.loggedInUser.html_url} target="_blank">
                        {item.loggedInUser.login}
                      </a>
                      <br />
                      <Link
                        className={styles.view__btn}
                        to={`/secure/admin/confirm/${item.id}`}
                      >
                        <button>View</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.no__requ}>
              <h3>No request here!</h3>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default SecureAdmin;
