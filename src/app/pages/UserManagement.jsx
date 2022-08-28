import { useState, useEffect } from "react";
import UserTable from "../components/UserTable/Table";
import { fetchAllUsers } from "../services/tocodeApi";

export default function UserManagement() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserTable() {
      try {
        const response = await fetchAllUsers();
        if (tableData.length <= 0) {
          setTableData(response);
        }
        setIsLoading(false);
      } catch (err) {}
    }

    fetchUserTable();
  }, []);

  if (isLoading) {
    return (
      <div className=" mt-20 flex flex-col items-center p-4 text-2xl">
        Cargando...
      </div>
    );
  }
  return (
    <div className=" m-auto flex h-full w-full flex-col items-center">
      <div className=" flex w-4/6 flex-row">
        <div className=" w-full">
          <p className=" m-5 text-4xl font-medium text-gray-700">
            Gestión de usuarios
          </p>
        </div>
      </div>
      <div className=" w-5/6 self-center">
        <UserTable data={tableData} rowsPerPage={10} />
      </div>
    </div>
  );
}
