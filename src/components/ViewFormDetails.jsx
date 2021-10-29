import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { AcceptedFormsContext } from "./App.jsx";
import styles from "../styles/Create.module.css";
import Editor from "./CreatePage/Editor";
import design from "../styles/ViewFormDetails.module.css";
import { FaGithub, FaRegUserCircle, FaPlus } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
const ViewFormDetails = () => {
  let { formid } = useParams();
  let [acceptedAllForms, setAcceptedAllForms] =
    useContext(AcceptedFormsContext);

  // find actual data
  const finded = acceptedAllForms.find((item) => item.id === formid);

  // html, css
  const [html, setHtml] = useState(finded.html);
  const [css, setCss] = useState(finded.css);

  // src doc
  const srcDoc = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
    </html>
    `;

  // history
  let history = useHistory();
  return (
    <>
      <section className={`${design.create__area} container`}>
        <div className={design.author__area}>
          <h3>Made by @{finded.loggedInUser.login}</h3>
        </div>
        <div className={styles.create__flex}>
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            bool={true}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            bool={true}
          />
        </div>

        <div className={styles.output__area}>
          <h5>OUTPUT</h5>
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

        {/* ============ About the creator =============== */}
        <div className={design.creator__create__flex}>
          <h6>@About the creator</h6>
          <div className={design.flex}>
            <div className={design.about__creator__area}>
              <div className={design.creator__flex}>
                <img src={finded.loggedInUser.avatar_url} alt="user-img" />
                <div className={design.creator__info}>
                  <h5>@{finded.loggedInUser.login}</h5>
                  <p>{finded.loggedInUser.bio}</p>
                  <a href={finded.loggedInUser.html_url} target="_blank">
                    <FaGithub /> {finded.loggedInUser.login}
                  </a>
                  <br />
                  <Link to={`/user/${finded.loggedInUser.login}`}>
                    <button className={design.visit__btn}>
                      <FaRegUserCircle /> Visit profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className={design.create__more__btn}>
              <h5>We need more forms!</h5>
              <p>
                help us by creating forms and you will get featured on this page
              </p>
              <Link to={`/create`}>
                <button className={design.visit__btn}>
                  <FaPlus /> Create
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== go back button ================== */}
        <div className={design.go__back__btn} style={{ marginTop: "20px" }}>
          <button onClick={() => history.goBack()}>Go back</button>
        </div>
      </section>
    </>
  );
};

export default ViewFormDetails;
