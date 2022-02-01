import React, { useRef, useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Logo from "../components/Logo";
import { signIn } from "../firebase";
import { AuthContext } from "../contexts/authContext";

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  let from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      console.log(e);
      alert("Error logging in");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      <div className="flex justify-center mt-14">
        <Logo />
      </div>

      {/*Body*/}
      <div className="w-full max-w-xs m-auto pb-14">
        <div className="w-min text-gray-400 opacity-70 hover:text-gray-500 cursor-pointer mb-5">
          <NavLink className="flex" to="/">
            <ArrowLeftIcon className="h-6 w-5 mr-2" />
            Atrás
          </NavLink>
        </div>

        {/* <div>Currently logged in as: {currentUser?.email}</div> */}

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Correo electrónico"
              ref={emailRef}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="*************"
              ref={passwordRef}
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              className="w-28 justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading || currentUser}
            >
              Entrar
            </button>
            <NavLink
              className="inline-block align-baseline font-bold text-xs text-gray-400 hover:text-gray-500"
              to="/register"
            >
              Registrarse
            </NavLink>
            <a
              className="inline-block align-baseline font-bold text-xs text-sky-600 hover:underline"
              href="#"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          &copy; 2Code 2022. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
