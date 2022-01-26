import React from "react";
import Navbar from '../components/Navbar';
import { NavLink } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/outline';

export default function Login() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 ">

      {/*Body*/}
      <div className="w-full max-w-xs m-auto">
        <div className="w-min text-gray-400 opacity-70 hover:text-gray-500 cursor-pointer mb-5">
          <NavLink className="flex" to="/"><ArrowLeftIcon className="h-6 w-5 mr-2"/>Atrás</NavLink>
        </div>
        
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
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button className="w-28 justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Entrar
            </button>
            <NavLink className="inline-block align-baseline font-bold text-xs text-gray-400 hover:text-gray-500" to="/register">Registrarse</NavLink>
            <a className="inline-block align-baseline font-bold text-xs text-sky-600 hover:underline" href="#">
              ¿Has olvidado tu contraseña?
            </a>
          </div>
        </form>
        
        <p className="text-center text-gray-500 text-xs">
          2Code &copy; 2022. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
