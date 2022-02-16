import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { logOut } from "../firebase";
import { AuthContext } from "../contexts/authContext";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
//import homeimg from "../../public/images";

export default function Home() {
  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      <Navbar className="" />
      <div className="flex h-full flex-col items-center justify-center  gap-10 sm:p-10 xl:flex-row">
        <div className="flex max-w-xl flex-col items-center gap-y-10 p-3">
          <h1 className=" text-center text-3xl font-extrabold tracking-tight text-slate-900 lg:text-3xl">
            Resuelve problemas de programación, desde tu mismo navegador.
          </h1>
          <p className=" w-4/5 text-center text-sm sm:text-lg ">
            2Code te permite probar tus habilidades de programación y te prepara
            para los examenes. ;)
          </p>
          <NavLink
            to="/register"
            className="rounded-md bg-teal-500 px-5 py-2 text-sm font-medium text-white hover:bg-teal-600 hover:text-white"
          >
            {/*colores de boton: #DB4C40 #B84136*/}
            Registrarse
          </NavLink>
        </div>
        <img
          src="/images/homepage-studente.jpg"
          className=" max-h-[500px] sm:w-4/5"
        />
      </div>
      <Footer />

      {/* Homepage flex flex-col h-screen items-center bg-blue-900 grid grid-cols-3 h-screen bg-blue-800 gap-5
      <div>Currently logged in as: {currentUser?.email}</div>
      <button
        className="w-max border rounded-md px-4 py-2 my-4 text-white bg-red-500 hover:text-gray-100 hover:bg-red-700"
        onClick={handleSignOut}
        disabled={loading || !currentUser}
      >
        Sign out
      </button> */}
    </div>
  );
}
