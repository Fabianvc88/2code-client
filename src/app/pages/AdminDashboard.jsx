import { Link } from "react-router-dom";
import { AuthContext, DataContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable/Table";
import WaintingToLoad from "../components/WaintingToLoad";
import { getAllUserCreatedProblems } from "../services/tocodeApi";

export default function AdminDashboard() {
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(DataContext);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardContent() {
      try {
        const response = await getAllUserCreatedProblems(userData.id);
        setTableData(response);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDashboardContent().then(setIsLoading(false));
  }, [currentUser.email, userData]);

  if (isLoading) {
    return <WaintingToLoad />;
  }
  return (
    <div className=" m-auto flex h-full w-full flex-col items-center">
      <div className=" flex w-4/6 flex-row">
        <div className=" w-full">
          <p className=" m-5 text-4xl font-medium text-gray-700">
            ¡Hola, {userData.firstname}!
          </p>
          <p className=" m-5 text-xl font-medium text-gray-700">
            Tus problemas creados :
          </p>
        </div>
        <div className=" flex w-2/6 flex-col gap-y-2 rounded-sm p-4 text-center">
          <Link
            className={`${
              userData?.role === "admin" ? " block" : " hidden"
            } rounded-sm bg-gray-200 p-2 hover:bg-gray-300`}
            to="/problems/newProblem"
          >
            Nuevo problema
          </Link>
          <Link
            className={`${
              userData?.role === "admin" ? " block" : " hidden"
            } rounded-sm bg-gray-200 p-2 hover:bg-gray-300`}
            to="/dashboard/admin/users"
          >
            Gestionar usuarios
          </Link>
        </div>
      </div>
      <div className=" w-5/6 self-center">
        <DashboardTable data={tableData} rowsPerPage={10} />
      </div>
    </div>
  );
}
