import React, { useState } from "react";

// for code editor
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import { CopyToClipboard } from "react-copy-to-clipboard";

// default styles
import styles from "../../styles/Editor.module.css";
import { Controlled as ControlledEditor } from "react-codemirror2";

// component started here
const Editor = (props) => {
  // state from props
  const { displayName, language, value, onChange, bool } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  const [text, setText] = useState(value);
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      {/* ==================== Code area ====================== */}
      <div className={styles.code__area}>
        {bool ? (
          <div className={styles.copy__btn}>
            <h4>{displayName}</h4>
            <CopyToClipboard text={text} onCopy={onCopyText}>
              {isCopied ? (
                <button style={{ background: "#f50057", color: "#fff" }}>
                  Copied
                </button>
              ) : (
                <button>Copy all</button>
              )}
            </CopyToClipboard>
          </div>
        ) : (
          <h5>{displayName}</h5>
        )}
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
            lineNumbers: true,
          }}
        />
      </div>
    </>
  );
};

export default Editor;
