import React, { useState } from "react";
import styles from "../../styles/Create.module.css";
import Editor from "./Editor";
const Create = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

  // src doc
  const srcDoc = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
    </html>
    `;
  return (
    <>
      <section className={`${styles.create__area} container`}>
        <div className={styles.create__flex}>
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
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
      </section>
    </>
  );
};

export default Create;
