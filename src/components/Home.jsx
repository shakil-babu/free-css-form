import React from "react";
import FormsShowCase from "./FormsShowCase";
import IntroSection from "./IntroSection";
import styles from "../styles/Home.module.css";
// component started here
const Home = () => {
  return (
    <>
      {/* ==================== Home area ===================== */}
      <section>
        <IntroSection />
        <FormsShowCase />
      </section>
    </>
  );
};

export default Home;
