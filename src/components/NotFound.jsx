import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";
const NotFound = () => {
  return (
    <>
      <section className={styles.notFound__area}>
        <div>
          <h1>An error as occurred.</h1>
          <h1>
            4<span>0</span>4
          </h1>
          <p>.The page you're looking for is not found or never existed.</p>
          <Link to="/">Back to home</Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
