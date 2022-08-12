import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table/Table";

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
    async function getFirstName() {
      const res = await getUserDataFromDB(currentUser.email);
      setUserData(res);
      setFirstname(res.firstname);
    }
    async function fetchTableData() {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/user/problems"
      );
      setTableData(response.data);
    }

    getFirstName();
    fetchTableData();
  }, [currentUser.email, setUserData]);

  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      <header className="w-full">
        <Navbar />
      </header>

      {/**Body */}
      <div className=" m-auto flex h-full w-full flex-col items-center  sm:p-6">
        <div className=" flex w-4/6 flex-row">
          <div className=" flex w-full">
            <p className=" m-5 text-4xl font-medium text-gray-700">
              ¡Hola, {firstname}!
            </p>
          </div>
          <div className=" flex w-2/6 flex-col gap-y-2 rounded-sm p-4 text-center">
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
        </div>
        <div className=" w-5/6 self-center">
          <Table data={tableData} rowsPerPage={8} />
        </div>
      </div>
    </div>
  );
}
