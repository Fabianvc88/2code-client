import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import Editor from "../components/Editor";
import LanguageDropdown from "../components/LanguageDropdown";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import { javascript } from "codemirror/mode/javascript/javascript";
import axios from "axios";

export default function Problems() {
  const [code, setCode] = useState(
    `#include "stdio.h"\r\rint add(a, b) {\n   \n}`
  );
  const url = "http://localhost:5000/problems";
  const code2 = { code: "Hola bola" };

  const submitCode = () => {
    console.log("Code is: ", code);
    axios.post(url, { code }).then((res) => console.log(res));
    /*fetch(url, {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(code2),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });*/
  };

  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      <header className="w-full">
        <Navbar />
      </header>

      {/**Body */}
      <div className="flex h-full w-full flex-col sm:flex-row">
        {/**Left tabs */}
        <div className="flex flex-col items-center  sm:w-1/3">
          <Tabs className="h-full" />
        </div>

        {/**Right Panels */}
        <div className="flex max-h-full w-full flex-col sm:w-2/3">
          <div className=" flex justify-between border-b p-2 px-10 text-sm text-slate-800">
            <div className="flex gap-x-10">
              <button className="bg-perl rounded px-5 py-2 hover:bg-gray-100">
                Anterior
              </button>
              <button className="bg-perl rounded px-5 py-2 hover:bg-gray-100">
                Siguiente
              </button>
            </div>
            <div className="flex gap-x-10">
              <button className="rounded border border-rose-500  px-2 py-2 text-rose-500 transition-colors hover:bg-rose-600 hover:text-white  ">
                Finalizar Test
              </button>
            </div>
          </div>

          <div className=" flex justify-between border-l border-b p-2 px-10 text-sm text-slate-800">
            <div className="flex gap-x-10">
              {/* <button className="bg-perl rounded px-5 py-2 hover:bg-gray-100">
                Lenguaje
              </button> */}
              <LanguageDropdown />
            </div>
            <div className="flex gap-x-10">
              <button
                className="bg-perl rounded px-3 py-2 text-emerald-600 transition-colors hover:bg-gray-100 "
                onClick={submitCode}
              >
                Ejecutar código
              </button>
              <button className="rounded bg-gray-600 px-3 py-2 text-white transition-colors hover:bg-gray-500">
                Enviar código
              </button>
            </div>
          </div>

          <div className="flex flex-1 border-l">
            <div className=" relative flex-1">
              <div className=" absolute h-full w-full overflow-y-auto">
                {/* <div className=" relative h-full w-full "> */}
                <CodeMirror
                  value={code}
                  options={{
                    keyMap: "sublime",
                    mode: "cpp",
                  }}
                  onChange={(editor, change) => {
                    setCode(editor.getValue());
                  }}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
