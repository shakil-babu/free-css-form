import React, { useEffect, useState } from "react";
import FormsShowCase from "./FormsShowCase";
import IntroSection from "./IntroSection";
import loader from "../images/loader.gif";
import styles from "../styles/Home.module.css";
// component started here
const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {/* ==================== Home area ===================== */}
      <section>
        <IntroSection />
        {loading ? (
          <div className={styles.loader}>
            <img src={loader} alt="free-css-form" />
          </div>
        ) : (
          <FormsShowCase />
        )}
        <div className="container"></div>
      </section>
    </>
  );
};

export default Home;
