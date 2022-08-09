import React, { useState } from "react";
import { Link } from "react-router-dom";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <div className=" flex flex-col items-center">
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
            <tr className={styles.tableRowItems} key={problem.id}>
              <td className={styles.idCell}>{problem.id}</td>
              <td className={styles.tableCell}>{problem.title}</td>
              <td className={styles.tableCell}>{problem.difficulty}</td>
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
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};

export default Table;
