import React, { useRef, useState, useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { singUp } from "../services/firebase";
import Logo from "../components/Logo";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";
import { sleep } from "../utils/sleep";
import { sendEmailVerification } from "firebase/auth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Register() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    let user = undefined;
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setErrorMsg("Contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      // Create account on Firebase
      user = await singUp(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      if (err === "EMAIL_EXISTS") {
        setErrorMsg("El email ya posee una cuenta asociada");
      } else {
        setErrorMsg(err);
      }
      setLoading(false);
      return;
    }

    try {
      if (!user) {
        setErrorMsg("Failed to create an account");
        setLoading(false);
        await sleep(1500);
        return;
      }
      // Create account on postgress
      const res = await axios.post(
        "http://localhost:5000/api/authentication/signup",
        {
          email: emailRef.current.value,
          firstname: firstnameRef.current.value,
          lastname: lastnameRef.current.value,
          password: passwordRef.current.value,
        }
      );
      if (res.data.status !== "CREATE") {
        //TODO show error on page
        setErrorMsg("Failed to create an account");
        setLoading(false);
        await sleep(1500);
        return;
      }
      // If user created successfully
      sendEmailVerification(user)
        .then(() => {
          // Email sent successfully
          navigate("/verifyEmail", { replace: true });
        })
        .catch((error) => {
          // Failed to send email
          setErrorMsg("Error al enviar email de verificación");
          console.error("error ", error.code, ": ", error.message);
          setLoading(false);
        });
      // await sleep(1500);
      // navigate("/", { replace: true });
    } catch (err) {
      setErrorMsg("Failed to create an account: ", err);
    }
  }

  function inputChangeHandler() {
    if (errorMsg !== "") setErrorMsg("");
  }

  // if (currentUser) {
  //   return <Navigate to="/dashboard" replace={true} />;
  // }
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
              ref={firstnameRef}
              required
            />
            <input
              className="focus:shadow-outline w-1/2 appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              id="lastnames"
              type="text"
              placeholder="Apellidos"
              ref={lastnameRef}
              required
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
              className={classNames(
                errorMsg === "Contraseñas no coinciden"
                  ? " border-2 border-red-600"
                  : " border",
                " focus:shadow-outline w-full appearance-none rounded py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
              )}
              id="passwordValidation"
              type="password"
              placeholder="Repetir contraseña"
              onChange={inputChangeHandler}
              ref={passwordConfirmRef}
              required
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
            <p
              className={`
                ${errorMsg === "" ? " hidden" : " block"}
                " px-6" bg-red-400 p-2`}
            >
              {errorMsg}
            </p>
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
