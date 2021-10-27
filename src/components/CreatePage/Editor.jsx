import React from "react";

// for code editor
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";

// default styles
import styles from "../../styles/Editor.module.css";
import { Controlled as ControlledEditor } from "react-codemirror2";

// component started here
const Editor = (props) => {
  // state from props
  const { displayName, language, value, onChange } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <>
      {/* ==================== Code area ====================== */}
      <div className={styles.code__area}>
        <h5>{displayName}</h5>
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
