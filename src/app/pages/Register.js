import React, { useRef, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { singUp } from "../services/firebase";
import Logo from "../components/Logo";
import { AuthContext } from "../contexts/authContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  async function handleSubmit() {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log("Las contraseñas no coinciden");
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await singUp(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError("Failed to create an account");
      console.log(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      <div className="mt-14 flex justify-center">
        <Logo />
      </div>

      {/**Body */}
      <div className="m-auto w-full max-w-xs pb-14 sm:max-w-sm">
        <div className="mb-5 w-min cursor-pointer text-gray-400 opacity-70 hover:text-gray-500">
          <NavLink className="flex" to="/login">
            <ArrowLeftIcon className="mr-2 h-6 w-5" />
            Login
          </NavLink>
        </div>

        <form
          className="mb-4 flex flex-col space-y-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="flex space-x-5">
            <input
              className="focus:shadow-outline w-1/2 appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="Nombre"
              required
            />
            <input
              className="focus:shadow-outline w-1/2 appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              id="lastnames"
              type="text"
              placeholder="Apellidos"
            />
          </div>

          <div className="">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="Correo electrónico"
              ref={emailRef}
              required
            />
          </div>

          <div className="">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Contraseña"
              ref={passwordRef}
              required
            />
          </div>

          <div className="">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              id="passwordValidation"
              type="password"
              placeholder="Repetir contraseña"
              ref={passwordConfirmRef}
            />
          </div>

          <div className="flex flex-col items-center space-y-8 pt-5">
            <button
              className="focus:shadow-outline rounded bg-teal-500 py-2 px-4 font-semibold  text-white hover:bg-teal-600 focus:outline-none"
              type="submit"
              disabled={loading || currentUser}
            >
              Registrarse
            </button>
            <p className="text-justify text-xs text-gray-500">
              Al hacer clic en "Registrarse", aceptas nuestras{" "}
              <a
                href="#"
                className="cursor-pointer text-blue-800 hover:underline"
              >
                Condiciones
              </a>
              . Obtén más información sobre cómo recopilamos, usamos y
              compartimos tus datos en la{" "}
              <a
                href="#"
                className="cursor-pointer text-blue-800 hover:underline"
              >
                Política de datos
              </a>
              , así como el uso que hacemos de las cookies en la{" "}
              <a
                href="#"
                className="cursor-pointer text-blue-800 hover:underline"
              >
                Política de cookies
              </a>
              .
            </p>
          </div>
        </form>

        <p className="text-center text-xs text-gray-500">
          &copy; 2Code 2022. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
