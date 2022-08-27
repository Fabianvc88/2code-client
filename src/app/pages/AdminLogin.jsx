import React, { useRef, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { signIn } from "../services/firebase";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";

export default function AdminLogin() {
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
      // check if is admin
      const res = await axios.post("http://localhost:5000/api/admin/signin", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (res.data.status !== "SIGNED") {
        throw res.data.status;
      }
      // signin in Firebase
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard", { replace: true });
      return;
    } catch (err) {
      setErrorMsg("Usuario y/o contraseña incorrectos");
      setLoading(false);
    }
  }

  function inputChangeHandler() {
    if (errorMsg !== "") setErrorMsg("");
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return (
    <div className="flex h-screen flex-col bg-gray-100 ">
      <div className="mt-14 flex justify-center">
        <Logo />
      </div>

      {/*Body*/}
      <div className=" m-auto flex w-full max-w-xs flex-col pb-14 sm:max-w-sm">
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
              onChange={inputChangeHandler}
              ref={passwordRef}
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              className="focus:shadow-outline w-28 justify-center rounded bg-sky-500 py-2 px-4 font-bold text-white hover:bg-sky-600 focus:outline-none disabled:bg-gray-300"
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
          </div>
        </form>
      </div>
    </div>
  );
}
