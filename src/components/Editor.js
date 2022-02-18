import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import { javascript } from "codemirror/mode/javascript/javascript";

export default function Editor() {
  const [code, setCode] = useState("a = 0");
  return (
    <CodeMirror
      value={code}
      options={{
        keyMap: "sublime",
        mode: "cpp",
      }}
      /* onChange={(evn) => setCode(evn.target.value)} */
    />
  );
}
