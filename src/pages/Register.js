import React from 'react';
import Navbar from '../components/Navbar';
import { NavLink } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/outline';

export default function Register() {
  return (
    <div className='flex flex-col h-screen items-center bg-gray-100'>

      {/**Body */}
      <div className="w-full max-w-sm m-auto">
        <div className="w-min text-gray-400 opacity-70 hover:text-gray-500 cursor-pointer mb-5">
          <NavLink className="flex" to="/login"><ArrowLeftIcon className="h-6 w-5 mr-2"/>Login</NavLink>
        </div>

        <form className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4">
          <div className="flex space-x-5">
            <input className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nombre"/>
            <input className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="lastnames" type="text" placeholder="Apellidos"/>
          </div>

          <div className="">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Correo electrónico"/>
          </div>

          <div className="">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña"/>
          </div>

          <div className="">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="passwordValidation" type="password" placeholder="Repetir contraseña"/>
          </div>
          
          <div className="flex flex-col items-center space-y-8 pt-5">
            <button className="justify-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Registrarse
            </button>
            <p className='text-xs text-justify text-gray-500'>Al hacer clic en "Registrarse", aceptas nuestras <a href='#' className='text-blue-800 hover:underline cursor-pointer'>Condiciones</a>
            . Obtén más información sobre cómo recopilamos, usamos y compartimos tus datos en la <a href='#' className='text-blue-800 hover:underline cursor-pointer'>Política de datos</a>
            , así como el uso que hacemos de las cookies en la <a href='#' className='text-blue-800 hover:underline cursor-pointer'>Política de cookies</a>.
            </p>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          2Code &copy; 2022. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
