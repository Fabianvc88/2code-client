import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import axios from "axios";
import ToggleSwitch from "../components/ToggleSwitch";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default function EditUser() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  const url = "http://localhost:5000/api/user/";

  const idRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();

  const [userCreationState, setUserCreationState] = useState("");
  let [creationErrorMsg, setCreationErrorMsg] = useState("");
  const [user, setUser] = useState({});
  const [isActive, setIsActive] = useState(false);

  /*useEffect(() => {
    async function fetchUserFields() {
      try {
        const response = await axios.get(`${url}/${params.userid}`);
        setUser(response.data);
        setIsActive(response.data.active);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUserFields();
  }, [params.userid]);*/

  async function sendUser(prob) {
    try {
      const res = await axios.put(`${url}/${params.userid}`, prob);
      //console.log("received: ", res.data);
      return res.data.status;
    } catch (err) {
      return err.response.data.errors[0];
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    //console.log("user id: ", user.userid);

    const userModifications = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      useremail: currentUser.current.value,
      role: roleRef.current.value,
    };

    sendUser(userModifications).then(async (res) => {
      if (res === "UPDATE") {
        setUserCreationState("updated");
        await sleep(1500);
        navigate("/dashboard");
      } else {
        if (res.msg === "Uniquename already exists") {
          setCreationErrorMsg("Título en uso");
        } else {
          setCreationErrorMsg("Error desconocido: intentarlo más tarde");
        }
        setUserCreationState("failed");
      }
    });
  }

  function statusMsgReset() {
    if (userCreationState !== "") setUserCreationState("");
  }

  return (
    <div className=" flex h-full flex-col">
      <div className=" flex justify-center">
        <form
          className=" flex w-2/3 flex-col items-center px-8 py-8"
          onSubmit={handleSubmit}
        >
          <div className=" flex w-full max-w-5xl flex-col gap-y-2">
            <h1 className=" border-b pb-4 text-4xl text-gray-800">
              Modificar usuario
            </h1>
            <div className=" my-6 flex flex-col gap-y-4">
              <div className=" flex items-center gap-x-2">
                <p className=" mx-2">Nombre : </p>
                <input
                  className=" w-1/4 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="title"
                  type="text"
                  autoComplete="off"
                  ref={firstnameRef}
                  required
                  onChange={statusMsgReset}
                  defaultValue={user.title}
                />
                <p className=" mx-2">Apellido : </p>
                <input
                  className=" w-1/3 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="title"
                  type="text"
                  autoComplete="off"
                  ref={lastnameRef}
                  required
                  onChange={statusMsgReset}
                  defaultValue={user.title}
                />
              </div>
              <div className=" flex items-center gap-x-3">
                <p className=" mx-2">Usuario : </p>
                <input
                  className=" w-1/4 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="title"
                  type="text"
                  autoComplete="off"
                  ref={usernameRef}
                  required
                  onChange={statusMsgReset}
                  defaultValue={user.title}
                />
                <p className=" mx-2">Email : </p>
                <input
                  className=" ml-3 w-1/4 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="title"
                  type="text"
                  autoComplete="off"
                  ref={emailRef}
                  required
                  onChange={statusMsgReset}
                  defaultValue={user.title}
                />
              </div>
              <div className=" flex gap-x-4 p-2">
                <p>Rol : </p>
                <select className=" pl-1" name="rol" ref={roleRef}>
                  <option
                    value="user"
                    selected={user.role === "user" ? true : false}
                  >
                    user
                  </option>
                  <option
                    value="admin"
                    selected={user.role === "admin" ? true : false}
                  >
                    admin
                  </option>
                </select>
              </div>
            </div>
            {/* <div className=" flex gap-x-2">
              <ToggleSwitch enabled={isActive} setEnabled={setIsActive} />
              <p className={isActive ? "text-green-600" : "text-red-600"}>
                {isActive ? "visible" : "oculto"}
              </p>
            </div> */}
            <div className=" flex justify-between">
              <div className=" flex w-1/2 gap-x-6">
                <Link
                  className=" focus:shadow-outline w-1/3 rounded-md bg-gray-100 p-2 py-2 px-4 text-center hover:bg-gray-200 focus:outline-none"
                  type="submit"
                  to="/admin/users"
                >
                  Cancelar
                </Link>
                <button
                  className=" focus:shadow-outline w-1/3 rounded-md bg-gray-100 p-2 py-2 px-4 text-center hover:bg-green-300 focus:outline-none"
                  type="submit"
                >
                  Confirmar
                </button>
                <button
                  className=" focus:shadow-outline w-1/3 rounded-md bg-red-200 p-2 py-2 px-4 text-center hover:bg-red-300 focus:outline-none"
                  type="submit"
                >
                  Eliminar usuario
                </button>
              </div>
              <div className=" flex w-1/2 justify-end">
                <p
                  className={classNames(
                    userCreationState !== "failed" ? " hidden" : " block",
                    " bg-red-400 p-2 px-6"
                  )}
                >
                  {creationErrorMsg}
                </p>
                <p
                  className={classNames(
                    userCreationState !== "updated" ? " hidden " : " block",
                    " bg-green-400 p-2 px-6"
                  )}
                >
                  Usuario actualizado
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
