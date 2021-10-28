import React, { useContext } from "react";
import styles from "../styles/FormsShowcase.module.css";
import { AiOutlineForm } from "react-icons/ai";
import { AcceptedFormsContext } from "./App";
import { Link } from "react-router-dom";
const FormsShowCase = () => {
  // accepted forms context
  const [acceptedAllForms, setAcceptedAllForms] =
    useContext(AcceptedFormsContext);

  return (
    <>
      <div className="container">
        <section className={styles.form__showcase__area}>
          <button className={styles.best__button}>
            <AiOutlineForm /> Best css free froms
          </button>

          <main>
            {acceptedAllForms.map((item, index) => {
              let srcDoc = `
                <html>
                    <body>${item.html}</body>
                    <style>${item.css}</style>
                </html>
            `;
              return (
                <div className={styles.single__fomrs}>
                  <div className={styles.forms__flex}>
                    <div className={styles.made__user}>
                      <img src={item.loggedInUser.avatar_url} alt="" />
                      <div>
                        <p>Made by</p>
                        <h5>@{item.loggedInUser.login}</h5>
                      </div>
                    </div>

                    <Link to={`/`}>
                      <button className={styles.view__btn}>View</button>
                    </Link>
                  </div>
                  <iframe
                    className={styles.output__iframe}
                    srcDoc={srcDoc}
                    frameborder="0"
                    width="100%"
                    height="100%"
                    title="Output"
                    sandbox="allow-scripts"
                  ></iframe>
                </div>
              );
            })}
          </main>
        </section>
      </div>
    </>
  );
};

export default FormsShowCase;
