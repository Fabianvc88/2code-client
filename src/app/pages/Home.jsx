import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/authContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  //if (currentUser) console.log("verificado: ", currentUser.emailVerified);

  // <div clas>
  //     {/* <div className="bg-perl flex h-screen flex-col items-center"> */}
  //     {/* <Navbar className="" /> */}
  return (
    <div className="flex h-full flex-col items-center justify-center  gap-10 sm:p-10 xl:flex-row">
      <div className="flex max-w-xl flex-col items-center gap-y-10 p-3">
        <h1 className=" text-center text-3xl font-extrabold tracking-tight text-slate-900 lg:text-3xl">
          Resuelve problemas de programación desde tu mismo navegador.
        </h1>
        <p className=" w-4/5 text-center text-sm sm:text-lg ">
          2Code te permite probar tus habilidades de programación y te prepara
          para los examenes. ;)
        </p>
        <NavLink
          to="/register"
          className={classNames(
            currentUser ? " invisible " : " visible",
            " rounded-md bg-teal-500 px-5 py-2 text-sm font-medium text-white hover:bg-teal-600 hover:text-white"
          )}
        >
          Registrarse
        </NavLink>
      </div>
      <img src="/images/homepage-studente.jpg" className=" max-h-[500px] " />
    </div>
  );
}
