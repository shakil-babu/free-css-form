import React from "react";
import styles from "../styles/Loading.module.css";
const Loading = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.loader}></div>
      </section>
    </>
  );
};

export default Loading;
