import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "../services/tocodeApi";
import WaintingToLoad from "../components/WaintingToLoad";
import { sleep } from "../utils/sleep";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditUser() {
  const navigate = useNavigate();
  const params = useParams();

  const [userCreationState, setUserCreationState] = useState("");
  const [creationErrorMsg, setCreationErrorMsg] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserFields() {
      try {
        const user = await getUserById(params.userid);
        if (user) setUser(user);
        //setIsActive(response.data.active);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUserFields();
    setIsLoading(false);
  }, [params.userid]);

  function handleSubmit(e) {
    e.preventDefault();

    updateUserById(params.userid, user)
      .then(async (res) => {
        if (res.status === "UPDATE") {
          setUserCreationState("updated");
          await sleep(1500);
          navigate("/dashboard/admin/users");
        } else {
          setCreationErrorMsg("Error desconocido: intentarlo más tarde");
          setUserCreationState("failed");
        }
      })
      .catch((err) => {
        if (err.response.data.status === "USER_NOT_FOUND") {
          setCreationErrorMsg("No se ha encontrado al usuario");
        } else if (err.response.data.status === "USERNAME_TAKEN") {
          setCreationErrorMsg("Nombre de usuario no disponible");
        } else if (err.response.data.status === "EMAIL_IN_USE") {
          setCreationErrorMsg(
            "La dirección email ya tiene una cuenta asociada"
          );
        } else if (err.response.data.status === "NOT_ALLOWED") {
          setCreationErrorMsg("Debe haber al menos un admin en todo momento");
        } else {
          setCreationErrorMsg("Error desconocido: intentarlo más tarde");
        }
        setUserCreationState("failed");
      });
  }

  function handleDelete() {
    deleteUserById(params.userid)
      .then(async (res) => {
        if (res.status === "DELETE") {
          setUserCreationState("deleted");
          await sleep(1500);
          navigate("/dashboard/admin/users");
        } else {
          setCreationErrorMsg("Error desconocido: intentarlo más tarde");
          setUserCreationState("failed");
        }
      })
      .catch((err) => {
        if (err.response.data.status === "USER_NOT_FOUND") {
          setCreationErrorMsg("No se ha encontrado al usuario");
        } else if (err.response.data.status === "NOT_ALLOWED") {
          setCreationErrorMsg("Debe haber al menos un admin en todo momento");
        } else {
          setCreationErrorMsg("Error desconocido: intentarlo más tarde");
        }
        setUserCreationState("failed");
      });
  }

  function statusMsgReset() {
    if (userCreationState !== "") setUserCreationState("");
  }

  if (isLoading) {
    return <WaintingToLoad />;
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
                  id="firstname"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(event) => {
                    statusMsgReset();
                    setUser((prev) => ({
                      ...prev,
                      firstname: event.target.value,
                    }));
                  }}
                  defaultValue={user.firstname}
                />
                <p className=" mx-2">Apellido : </p>
                <input
                  className=" w-1/3 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="lastname"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(event) => {
                    statusMsgReset();
                    setUser((prev) => ({
                      ...prev,
                      lastname: event.target.value,
                    }));
                  }}
                  defaultValue={user.lastname}
                />
              </div>
              <div className=" flex items-center gap-x-3">
                <p className=" mx-2">Usuario : </p>
                <input
                  className=" w-1/4 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="username"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(event) => {
                    statusMsgReset();
                    setUser((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }));
                  }}
                  defaultValue={user.username}
                />
                <p className=" mx-2">Email : </p>
                <input
                  className=" ml-3 w-1/4 rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  id="email"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(event) => {
                    statusMsgReset();
                    setUser((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }));
                  }}
                  defaultValue={user.email}
                />
              </div>
              <div className=" flex gap-x-4 p-2">
                <p>Rol : </p>
                <select
                  className=" pl-1"
                  name="rol"
                  value={user.role}
                  onChange={(event) => {
                    setUser((prev) => ({
                      ...prev,
                      role: event.target.value,
                    }));
                  }}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
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
                  to="/dashboard/admin/users"
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
                  type="button"
                  onClick={handleDelete}
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
                <p
                  className={classNames(
                    userCreationState !== "deleted" ? " hidden " : " block",
                    " bg-green-400 p-2 px-6"
                  )}
                >
                  Usuario eliminado
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
