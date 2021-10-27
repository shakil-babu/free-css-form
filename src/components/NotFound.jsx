import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

// start here
const NotFound = () => {
  return (
    <>
      {/* ================ 404 page ==================== */}
      <section className={styles.notFound__area}>
        <div>
          <h1>An error as occurred.</h1>
          <h1>
            4<span>0</span>4
          </h1>
          <p>.The page you're looking for is not found or never existed.</p>

          {/* =============== link for back to home ================= */}
          <Link to="/">Back to home</Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
