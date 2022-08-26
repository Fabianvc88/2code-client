import React, { useState, useEffect, useContext, useRef } from "react";
import Tabs from "../components/Tabs";
import LanguageDropdown from "../components/LanguageDropdown";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

export default function Problem() {
  const { currentUser } = useContext(AuthContext);
  let params = useParams();
  const url = "http://localhost:5000/api";
  const [problem, setProblem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState("");
  const languageList = [
    { name: "javascript" },
    { name: "c/c++" },
    { name: "java" },
    { name: "go" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languageList[0]);
  const [serverResponse, setServerResponse] = useState();
  const [execFailedTestCase, setExecFailedTestCase] = useState([]);
  /*let actionMsg;
  if (serverResponse) {
    let msgClassName;
    if (serverResponse.status === "pass") {
      msgClassName =
        "self-center rounded-md bg-green-200 px-3 py-1 text-green-500";
    } else {
      msgClassName = "self-center rounded-md bg-red-200 px-3 py-1 text-red-500";
    }
    actionMsg = <p className={msgClassName}>{serverResponse.msg}</p>;
  }*/

  useEffect(() => {
    async function fetchProblemDetails() {
      const response = await axios.get(`${url}/problem/${params.problemId}`);
      if (response.status !== 200) {
        console.error(response.status, " : ", response.statusText);
        return null;
      }
      return response.data;
    }
    async function fetchLatestUserSubmissionData() {
      const response = await axios.post(`${url}/submission/data`, {
        problemId: params.problemId,
        email: currentUser.email,
      });
      if (response.status !== 200) {
        console.error(response.status, " : ", response.statusText);
        return null;
      }
      if (response.data.msg === "NO_SUBMISSION_FOUND") {
        return null;
      }
      return response.data.submission;
    }
    async function fillPlaygroundData() {
      // set default problem data
      const problem = await fetchProblemDetails();
      if (problem) {
        setProblem(problem);
        setCode(problem.jsmain);
      }
      // complement/replace default problem data with submission data
      const submission = await fetchLatestUserSubmissionData();
      if (submission) {
        setCode(submission.solution);
      }
      setIsLoading(false);
    }

    fillPlaygroundData();
  }, [params.problemId, currentUser.email]);

  function printData() {
    console.log(problem);
  }

  async function submitCode() {
    const response = await axios.post(`${url}/submission/run`, {
      code,
      problemId: params.problemId,
      language: selectedLanguage.name,
      email: currentUser.email,
    });
    console.log(response.data);
    if (response.data.status === "fail") {
      setExecFailedTestCase(response.data.message.split(";"));
    }
    setServerResponse(response.data);
  }

  if (isLoading) {
    return <div className=" flex items-center justify-center">Cargando...</div>;
  }
  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      {/**Body */}
      <div className="flex h-full w-full flex-col sm:flex-row">
        {/**Left tabs */}
        <div className="flex flex-col items-center  sm:w-1/3">
          <Tabs
            className="h-full"
            title={problem.title}
            description={problem.description}
            help={problem.help}
          />
        </div>

        {/**Right Panels */}
        <div className="flex max-h-full w-full flex-col sm:w-2/3">
          <div className=" flex justify-between border-b p-2 text-sm text-slate-800">
            <div className="flex gap-x-10">
              <NavLink
                className=" flex rounded px-5 py-2 hover:bg-gray-100"
                to="/problems"
              >
                <ArrowLeftIcon className="mr-2 h-6 w-5" />
                Atrás
              </NavLink>
              <button className="bg-perl hidden rounded px-5 py-2 hover:bg-gray-100">
                Anterior
              </button>
              <button className="bg-perl hidden rounded px-5 py-2 hover:bg-gray-100">
                Siguiente
              </button>
            </div>
            <div className="flex gap-x-10">
              <button className="hidden rounded border border-rose-500  px-2 py-2 text-rose-500 transition-colors hover:bg-rose-600 hover:text-white  ">
                Finalizar Test
              </button>
            </div>
          </div>

          <div className=" flex justify-between border-l border-b p-2 px-10 text-sm text-slate-800">
            <div className="flex gap-x-10">
              <LanguageDropdown
                languageList={languageList}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            </div>
            <div className="flex gap-x-10">
              <p
                className={`${
                  serverResponse
                    ? serverResponse.status === "pass"
                      ? "bg-green-200 text-emerald-700"
                      : "bg-red-200 text-rose-700"
                    : " hidden"
                } self-center rounded-md px-3 py-1 `}
              >
                {serverResponse
                  ? serverResponse.status === "pass"
                    ? `${serverResponse.message}`
                    : `La solución no ha pasado los casos de prueba` //Fallo en el caso de prueba:
                  : ""}
              </p>
              <button
                className="bg-perl rounded px-3 py-2 text-emerald-600 transition-colors hover:bg-gray-100 "
                onClick={printData}
              >
                Guardar código
              </button>
              <button
                className="rounded bg-gray-600 px-3 py-2 text-white transition-colors hover:bg-gray-500"
                onClick={submitCode}
              >
                Ejecutar solución
              </button>
            </div>
          </div>

          <div className="flex flex-1 border-l">
            <div className=" relative flex-1">
              <div className=" absolute h-full w-full overflow-y-auto">
                <CodeMirror
                  value={code}
                  options={{
                    keyMap: "sublime",
                    mode: "javascript",
                    tabSize: 2,
                    lineWrapping: true,
                  }}
                  onChange={(editor, change) => {
                    setCode(editor.getValue());
                    if (serverResponse) {
                      setServerResponse(undefined);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
