import React, { useContext, useEffect, useState } from "react";
import FormsShowCase from "./FormsShowCase";
import IntroSection from "./IntroSection";
// component started here
const Home = () => {
  return (
    <>
      {/* ==================== Home area ===================== */}
      <section>
        <IntroSection />
        <FormsShowCase />
        <div className="container"></div>
      </section>
    </>
  );
};

export default Home;
