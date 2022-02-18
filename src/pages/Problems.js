import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import Editor from "../components/Editor";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import { javascript } from "codemirror/mode/javascript/javascript";

export default function Problems() {
  const [code, setCode] = useState(`function add(a, b) {\n  \n}`);

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
              <button className="bg-perl rounded px-5 py-2 hover:bg-gray-100">
                Lenguaje
              </button>
            </div>
            <div className="flex gap-x-10">
              <button className="bg-perl rounded px-3 py-2 text-emerald-600 transition-colors hover:bg-gray-100 ">
                Ejecutar código
              </button>
              <button className="rounded bg-gray-600 px-3 py-2 text-white transition-colors hover:bg-gray-500">
                Enviar código
              </button>
            </div>
          </div>

          <div className="flex flex-1">
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
                    console.log(code);
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
