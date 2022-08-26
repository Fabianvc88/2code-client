import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function DynamicTable() {
  const [list, setList] = useState([]);

  useEffect(async () => {
    const response = await axios.get("http://127.0.0.1:5000/api/problem/");
    setList(response.data);
  }, []);

  function renderProblemsRows() {
    return list.map((problem, i) => {
      return (
        <tr key={"problem-" + i} className=" border border-solid p-2">
          <td className=" p-2 text-center">{i + 1}</td>
          <td className=" p-2 text-left">{problem.title}</td>
          <td className=" p-2 text-left">{problem.difficulty}</td>
          <td className=" flex justify-center">
            <Link
              to={`/playground/${problem.id}`}
              key={problem.id}
              className=" m-2 rounded-md border border-solid bg-sky-500 p-1 text-white hover:bg-sky-400"
            >
              Resolver
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="flex w-1/2 self-center">
      <table className=" w-full">
        <thead>
          <tr>
            <th className=" border border-solid p-2 text-center">id</th>
            <th className=" border border-solid p-2 text-left">Problema</th>
            <th className=" border border-solid p-2 text-left">Dificultad</th>
            <th className=" border-t border-r border-solid p-2"></th>
          </tr>
        </thead>
        <tbody>{renderProblemsRows()}</tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
