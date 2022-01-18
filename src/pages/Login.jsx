import React from "react";

export default function Login() {
  return (
    <div className=" bg-gray-100 ">
      <div class="w-full max-w-xs m-auto pt-16">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Usuario
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Correo electronico"/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Contraseña
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*************"/>
            {/*<p class="text-red-500 text-xs italic">Please choose a password.</p>*/}
          </div>
          <div class="flex flex-col items-center space-y-4">
            <button class="w-28 justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Entrar
            </button>
            <a class="inline-block align-baseline font-bold text-xs text-gray-400 hover:text-gray-500" href="#">
              Registrarse
            </a>
            <a class="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
              ¿Has olvidado tu usuario o contraseña?
            </a>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2022 2Code. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
