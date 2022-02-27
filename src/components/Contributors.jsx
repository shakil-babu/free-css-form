import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Contributors.module.css";
import { AcceptedFormsContext } from "./App";
const Contributors = () => {
  // accepted all forms
  const [acceptedAllForms, setAcceptedAllForms] =
    useContext(AcceptedFormsContext);

  // find all contributors
  let users = [];
  for (let item of acceptedAllForms) {
    users.push(
      [
        item.loggedInUser.avatar_url,
        item.loggedInUser.login,
        item.loggedInUser.location,
      ].join("</join>")
    );
  }

  // all contributors
  users = [...new Set(users)].map((item) => item.split("</join>"));

  return (
    <div className={styles.contributors__area}>
      <div className={styles.contributors__introduction}>
        <h1>
          Our {users.length} mango contributor{users.length > 1 ? "s" : ""} 😍
        </h1>
      </div>

      <div className={styles.contributors__grid__area}>
        {users.map((item, index) => {
          return (
            <div
              key={index + 10}
              className={styles.contributors__user__profile}
            >
              <img src={item[0]} alt="profile-img" />

              <div className={styles.contributors__user__profile__bio}>
                <Link
                  to={`/user/${item[1]}`}
                  style={{ textDecoration: "none" }}
                >
                  <h5>@{item[1]}</h5>
                </Link>
                <p>{item[2] ? item[2] : "Location not found!"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contributors;
