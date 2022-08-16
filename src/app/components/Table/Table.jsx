import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const navigate = useNavigate();

  /*function rowClickHandler(e) {
    e.navigate(`/playground/${problem.id}`);
  }*/

  return (
    <div className=" flex flex-col items-center">
      <div className=" w-4/5">
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              <th className={styles.tableIdHeader}>id</th>
              <th className={styles.tableHeader}>Título</th>
              <th className={styles.tableHeader}>Dificultad</th>
              <th className={styles.tableHeader}></th>
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
                <td className=" flex">
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
