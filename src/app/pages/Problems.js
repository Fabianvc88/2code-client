import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DynamicTable from "../components/DynamicTable";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../components/Table/Table";

export default function Problems() {
  const [code, setCode] = useState(
    `#include "stdio.h"\r\rint add(a, b) {\n   \n}`
  );
  const url = "http://localhost:5000/api/problem/";

  const getAllProblems = () => {
    console.log("Code is: ", code);
    axios.get(url).then((res) => console.log(res));
  };

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
      <div className="m-auto flex h-full w-full flex-col gap-10 sm:p-6">
        <div className=" w-1/2 self-center">
          <Link className=" rounded-sm p-2 hover:bg-gray-200" to="new">
            Nuevo problema
          </Link>
        </div>
        <div className=" w-5/6 self-center ">
          <Table data={tableData} rowsPerPage={10} />
        </div>

        {/**<DynamicTable />*/}
      </div>
      <Footer />
    </div>
  );
}
