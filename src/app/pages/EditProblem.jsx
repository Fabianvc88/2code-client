import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";
import ToggleSwitch from "../components/ToggleSwitch";
import { sleep } from "../utils/sleep";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditProblem() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  const url = "http://localhost:5000/api/problem/";

  const titleRef = useRef();
  const descriptionRef = useRef();
  const help1Ref = useRef();
  const testCasesRef = useRef();
  const difficultyRef = useRef();

  const [problemCreationState, setProblemCreationState] = useState("");
  let [creationErrorMsg, setCreationErrorMsg] = useState();
  const [problem, setProblem] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function fetchProblemFields() {
      try {
        const response = await axios.get(`${url}/${params.problemId}`);
        setProblem(response.data);
        setIsActive(response.data.active);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProblemFields();
  }, [params.problemId]);

  async function sendProblem(prob) {
    try {
      const res = await axios.put(`${url}/${params.problemId}`, prob);
      //console.log("received: ", res.data);
      return res.data.status;
    } catch (err) {
      return err.response.data.errors[0];
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    //console.log("user id: ", problem.userid);

    const problemModifications = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      help: [help1Ref.current.value],
      tests: testCasesRef.current.value,
      difficulty: difficultyRef.current.value,
      useremail: currentUser.email,
      jsmain: "",
      cmain: "",
      javamain: "",
      active: isActive,
    };

    sendProblem(problemModifications).then(async (res) => {
      if (res === "UPDATE") {
        setProblemCreationState("updated");
        await sleep(1500);
        navigate("/dashboard/admin");
      } else {
        if (res.msg === "Uniquename already exists") {
          setCreationErrorMsg("Título en uso");
        } else {
          setCreationErrorMsg("Error desconocido: intentarlo más tarde");
        }
        setProblemCreationState("failed");
      }
    });
  }

  function titleChangeHandler() {
    if (problemCreationState !== "") setProblemCreationState("");
  }

  return (
    <div className=" flex h-full flex-col">
      <div className=" flex justify-center">
        <form
          className=" flex w-2/3 flex-col items-center px-8 py-8"
          onSubmit={handleSubmit}
        >
          <div className=" flex w-full max-w-5xl flex-col gap-y-2">
            <h1 className=" border-b pb-4 text-4xl text-gray-800">
              Editar problema :
            </h1>
            <div className=" flex items-center gap-x-2">
              <p className=" mx-2">Título : </p>
              <input
                className=" w-1/3 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="title"
                type="text"
                autoComplete="off"
                ref={titleRef}
                required
                onChange={titleChangeHandler}
                defaultValue={problem.title}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <p className=" mx-2">Descripción : </p>
              <textarea
                className=" h-24 w-full resize-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="description"
                type="text"
                autoComplete="off"
                ref={descriptionRef}
                required
                defaultValue={problem.description}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <p className=" mx-2">Ayuda : </p>
              <textarea
                className=" h-14 w-full resize-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="help1"
                type="text"
                autoComplete="off"
                ref={help1Ref}
                defaultValue={problem.help}
              />
            </div>
            <div className=" flex flex-col gap-y-2">
              <p className=" mx-2">Casos de prueba : </p>
              <textarea
                className=" h-24 w-full rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="tests"
                type="text"
                autoComplete="off"
                ref={testCasesRef}
                required
                defaultValue={problem.tests}
              />
            </div>
            <div className=" flex gap-x-4 p-2">
              <p>Dificultad : </p>
              <select name="difficulty" id="diff" ref={difficultyRef}>
                <option
                  value="10"
                  selected={problem.difficulty === "10" ? true : false}
                >
                  fácil
                </option>
                <option
                  value="20"
                  selected={problem.difficulty === "20" ? true : false}
                >
                  medio
                </option>
                <option
                  value="30"
                  selected={problem.difficulty === "30" ? true : false}
                >
                  difícil
                </option>
              </select>
            </div>
            <div className=" flex gap-x-2">
              <ToggleSwitch enabled={isActive} setEnabled={setIsActive} />
              <p className={isActive ? "text-green-600" : "text-red-600"}>
                {isActive ? "visible" : "oculto"}
              </p>
            </div>
            <div className=" flex justify-between">
              <div className=" flex w-1/2 gap-x-6">
                <Link
                  className=" focus:shadow-outline w-1/3 rounded-sm bg-gray-100 p-2 py-2 px-4 text-center hover:bg-gray-200 focus:outline-none"
                  type="submit"
                  to="/dashboard/admin"
                >
                  Cancelar
                </Link>
                <button
                  className=" focus:shadow-outline w-1/3 rounded-sm bg-gray-100 p-2 py-2 px-4 text-center hover:bg-green-200 focus:outline-none"
                  type="submit"
                >
                  Confirmar
                </button>
              </div>
              <div className=" flex w-1/2 justify-end">
                <p
                  className={classNames(
                    problemCreationState !== "failed" ? " hidden" : " block",
                    " bg-red-400 p-2 px-6"
                  )}
                >
                  {creationErrorMsg}
                </p>
                <p
                  className={classNames(
                    problemCreationState !== "updated" ? " hidden " : " block",
                    " bg-green-400 p-2 px-6"
                  )}
                >
                  Problema actualizado
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
