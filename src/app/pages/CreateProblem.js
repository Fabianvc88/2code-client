import React, { useRef, useState, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";

export default function CreateProblem() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const help1Ref = useRef();
  const testCasesRef = useRef();
  const difficultyRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const url = "http://localhost:5000/api/problem/";

  function handleSubmit(e) {
    e.preventDefault();

    const help = [help1Ref.current.value];
    const problem = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      help: help,
      tests: testCasesRef.current.value,
      difficulty: difficultyRef.current.value,
    };

    console.log("sending new problem to server...");
    sendProblem(problem);
  }

  async function sendProblem(problem) {
    await axios.post(url, problem).then((res) => console.log(res));
  }

  return (
    <div className="bg-perl flex h-screen flex-col">
      <header className=" w-full">
        <Navbar />
      </header>

      {/**Body */}
      <div className=" flex h-full flex-col">
        <div className=" flex justify-center">
          <form
            className=" flex w-2/3 flex-col items-center px-8 py-8"
            onSubmit={handleSubmit}
          >
            <div className=" flex w-full max-w-5xl flex-col space-y-5">
              <h1 className=" border-b pb-4 text-4xl text-gray-800">
                Nuevo problema :
              </h1>

              <input
                className=" w-1/3 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="title"
                type="text"
                placeholder="Título"
                autoComplete="off"
                ref={titleRef}
                required
              />
              <textarea
                className=" h-24 w-full resize-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="description"
                type="text"
                placeholder="Descripción"
                autoComplete="off"
                ref={descriptionRef}
                required
              />
              <textarea
                className=" h-14 w-full resize-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="description"
                type="text"
                placeholder="Ayuda 1"
                autoComplete="off"
                ref={help1Ref}
              />
              <textarea
                className=" h-24 w-full rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="tests"
                type="text"
                placeholder="Casos de prueba"
                autoComplete="off"
                ref={testCasesRef}
                required
              />
              <div className=" flex gap-x-8">
                <p>Dificultad: </p>
                <select name="difficulty" id="diff" ref={difficultyRef}>
                  <option value="10">fácil</option>
                  <option value="20">medio</option>
                  <option value="30">difícil</option>
                </select>
              </div>
              <div className=" flex gap-x-6">
                <Link
                  className="  focus:shadow-outline max-w-xs place-self-end rounded-sm bg-gray-100 p-2 py-2 px-4 text-center hover:bg-gray-200 focus:outline-none lg:w-1/5"
                  type="submit"
                  to="/problems"
                >
                  Cancelar
                </Link>
                <button
                  className=" focus:shadow-outline  max-w-xs place-self-end rounded-sm bg-gray-100 p-2 py-2 px-4 hover:bg-green-200  focus:outline-none lg:w-1/5"
                  type="submit"
                >
                  Crear problema
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
