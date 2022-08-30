import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "../components/Table/Table";
import { getAllActiveProblemsOrderByProperty } from "../services/tocodeApi";
import WaintingToLoad from "../components/WaintingToLoad";

export default function Problems() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTableData() {
      let problemList;
      try {
        problemList = await getAllActiveProblemsOrderByProperty("difficulty");
      } catch (err) {
        console.error(err);
      }
      setTableData(problemList);
    }

    fetchTableData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <WaintingToLoad />;
  }
  return (
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
  );
}
