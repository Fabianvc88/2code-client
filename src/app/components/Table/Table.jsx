import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckIcon, MinusIcon } from "@heroicons/react/solid";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const navigate = useNavigate();

  const headers = ["#", "id", "Título", "Dificultad", "Resuelto", " "];

  return (
    <div className=" flex flex-col items-center">
      <div className=" w-4/5">
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              <th className={styles.tableIdHeader}>{headers[0]}</th>
              <th className={styles.tableIdHeader}>{headers[1]}</th>
              <th className={styles.tableHeader}>{headers[2]}</th>
              <th className={styles.tableHeader}>{headers[3]}</th>
              <th className={styles.tableIdHeader}>{headers[4]}</th>
              <th className={styles.tableIdHeader}>{headers[5]}</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((problem, i) => (
              <tr
                className={styles.tableRowItems}
                key={problem.id}
                onClick={(ev) => {
                  navigate(`/playground/${problem.id}`);
                }}
              >
                <td className=" p-3 text-center text-sm text-gray-600">
                  {i + 1 + rowsPerPage * (page - 1)}
                </td>
                <td className={styles.idCell}>{problem.id}</td>
                <td className={styles.tableCell}>{problem.title}</td>
                <td className={styles.tableCell}>
                  {problem.difficulty === "10"
                    ? "fácil"
                    : problem.difficulty === "20"
                    ? "medio"
                    : problem.difficulty === "30"
                    ? "difícil"
                    : "?"}
                </td>
                <td>
                  <div className=" flex items-center justify-center">
                    {problem.status === "pass" ? (
                      <CheckIcon className=" h-6 w-6" />
                    ) : (
                      <MinusIcon className=" h-6 w-6" />
                    )}
                  </div>
                </td>
                <td className=" text-center">
                  <Link
                    to={`/playground/${problem.id}`}
                    key={problem.id}
                    className=" m-2 w-1/5 rounded-md border border-solid bg-gray-200 p-1 text-black hover:bg-sky-400"
                  >
                    Resolver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default Table;
