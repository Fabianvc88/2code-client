import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DashboardTable from "../components/DashboardTable/Table";

export default function Dashboard() {
  const { currentUser, userData, setUserData } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const url = "http://localhost:5000/api/user/check";
  const [tableData, setTableData] = useState([]);

  async function getUserDataFromDB(email) {
    try {
      const response = await axios.post(url, {
        email,
      });
      return response.data;
    } catch (err) {
      console.log("Couldn't get user data");
      return null;
    }
  }

  useEffect(() => {
    async function fetchDashboardContent() {
      let user;
      try {
        user = await getUserDataFromDB(currentUser.email);
        setFirstname(user.firstname);

        const response = await axios.post(
          "http://127.0.0.1:5000/api/user/problems",
          {
            id: user.id,
          }
        );
        setTableData(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDashboardContent();
  }, [currentUser.email]);

  // <div className="bg-perl flex h-screen flex-col items-center">
  //     <header className="w-full">
  //       <Navbar />
  //     </header>
  //     {/**Body */}

  return (
    <div className=" m-auto flex h-full w-full flex-col items-center">
      <div className=" flex w-4/6 flex-row">
        <div className=" w-full">
          <p className=" m-5 text-4xl font-medium text-gray-700">
            ¡Hola, {firstname}!
          </p>
          <p className=" m-5 text-xl font-medium text-gray-700">
            Tus problemas creados :
          </p>
        </div>
        <div className=" flex w-2/6 flex-col gap-y-2 rounded-sm p-4 text-center">
          <Link
            className=" rounded-sm bg-gray-200 p-2 hover:bg-gray-300"
            to="/problems/newProblem"
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
      </div>
      <div className=" w-5/6 self-center">
        <DashboardTable data={tableData} rowsPerPage={10} />
      </div>
    </div>
  );
}
