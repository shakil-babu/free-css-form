import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import styles from "../../styles/Editor.module.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
const Editor = (props) => {
  const { displayName, language, value, onChange } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <>
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
