import React from "react";
import styles from '../styles/IntroSection.module.css';
import { AiOutlineForm } from 'react-icons/ai';
const IntroSection = () => {
  return (
    <>
      <section className={styles.intro__area}>
        <div className={styles.intro__inner}>
          <AiOutlineForm className={styles.icon}/>
        <h2>Choose the best <span>form</span> for your project.</h2>
        <p>Free to use / No bullshits here!</p>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
