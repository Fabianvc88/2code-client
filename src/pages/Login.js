import React from "react";
import Navbar from '../components/Navbar';
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      <Navbar />

      {/*Body*/}
      <div className="w-full max-w-xs m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Usuario
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Correo electrónico"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Contraseña
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*************"/>
            {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button className="w-28 justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Entrar
            </button>
            <NavLink className="inline-block align-baseline font-bold text-xs text-gray-400 hover:text-gray-500" to="/register">Registrarse</NavLink>
            <a className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-700" href="#">
              ¿Has olvidado tu usuario o contraseña?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 2Code. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
