import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export default function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      <header className="w-full">
        <Navbar />
      </header>

      {/**Body */}
      <div className=" m-auto flex h-full w-full flex-col items-center gap-10 sm:p-6">
        <div className=" w-4/5 border">
          <div className=" flex w-1/6 flex-col gap-y-2 rounded-sm border p-4 text-center">
            <Link
              className=" rounded-sm bg-gray-200 p-2 hover:bg-gray-300"
              to="myproblems"
            >
              Nuevo problema
            </Link>
            <Link
              className=" rounded-sm bg-gray-200 p-2 hover:bg-gray-300"
              to="myproblems"
            >
              Algo mas
            </Link>
          </div>
          <div>
            <p>¡Hola {currentUser}!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
