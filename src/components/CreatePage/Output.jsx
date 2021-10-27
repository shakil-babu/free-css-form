import React from "react";

const Output = () => {
  let srcDoc = `
    <html>
        <body>${item.html}</body>
        <style>${item.css}</style>
    </html>
              `;
  return (
    <>
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
    </>
  );
};

export default Output;
