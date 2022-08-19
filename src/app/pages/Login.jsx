import React, { useRef, useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Logo from "../components/Logo";
import { signIn } from "../services/firebase";
import { AuthContext } from "../contexts/authContext";
import { sleep } from "../utils/sleep";

export default function Login() {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  //let location = useLocation();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //let from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const userCredential = await signIn(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/dashboard", { replace: true });
    } catch (err) {
      //console.log(err);
      setErrorMsg("Usuario y/o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  function inputChangeHandler() {
    if (errorMsg !== "") setErrorMsg("");
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100 ">
      <div className="mt-14 flex justify-center">
        <Logo />
      </div>

      {/*Body*/}
      <div className=" m-auto flex w-full max-w-xs flex-col pb-14 sm:max-w-sm">
        <div className="mb-5 w-min cursor-pointer text-gray-400 opacity-70 hover:text-gray-500">
          <NavLink className="flex" to="/">
            <ArrowLeftIcon className="mr-2 h-6 w-5" />
            Atrás
          </NavLink>
        </div>

        <form
          className="mb-4 rounded bg-white px-8 py-14 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Usuario
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="Correo electrónico"
              onChange={inputChangeHandler}
              ref={emailRef}
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Contraseña
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              type="password"
              placeholder="*************"
              onChange={inputChangeHandler}
              ref={passwordRef}
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              className="focus:shadow-outline w-28 justify-center rounded bg-sky-500 py-2 px-4 font-bold text-white hover:bg-sky-600 focus:outline-none"
              type="submit"
              disabled={loading || currentUser}
            >
              Entrar
            </button>
            <p
              className={`
                ${errorMsg === "" ? " hidden" : " block"}
                " px-6" bg-red-400 p-2`}
            >
              {errorMsg}
            </p>
            <NavLink
              className="inline-block align-baseline text-xs font-bold text-gray-400 hover:text-gray-500 lg:text-sm"
              to="/register"
            >
              Registrarse
            </NavLink>
            <a
              className="inline-block align-baseline text-xs font-bold text-sky-600 hover:underline lg:text-sm"
              href="#"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>
        </form>

        {/* <p className="text-center text-xs text-gray-500">
          &copy; 2Code 2022. Todos los derechos reservados.
        </p> */}
      </div>
    </div>
  );
}
