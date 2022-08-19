import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../components/Table/Table";

export default function Problems() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchTableData() {
      const response = await axios.get("http://127.0.0.1:5000/api/problem/");
      setTableData(response.data);
    }

    fetchTableData();
  }, []);

  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      <header className="w-full">
        <Navbar />
      </header>

      {/**Body */}
      <div className="m-auto flex h-full w-full flex-col gap-y-4 ">
        <div className=" w-1/2 self-center">
          <Link className=" hidden rounded-sm p-2 hover:bg-gray-200" to="new">
            Nuevo problema
          </Link>
        </div>
        <div className=" w-5/6 self-center ">
          <Table data={tableData} rowsPerPage={12} />
        </div>
      </div>
    </div>
  );
}
