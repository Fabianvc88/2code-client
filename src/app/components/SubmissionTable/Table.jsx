import { ArrowRightIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const headers = [
    "#",
    "Problema",
    "Lenguaje",
    "Resultado",
    "Tiempo de ejec.",
    "Fecha-Hora",
  ];

  return (
    <div className=" flex flex-col items-center">
      <div className=" w-4/5">
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              {headers.map((header, i) => {
                return (
                  <th
                    className={
                      i > 0 ? styles.tableHeader : styles.tableIdHeader
                    }
                  >
                    {header}
                  </th>
                );
              })}
              <th className={styles.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {slice.map((entry, i) => {
              return (
                <tr>
                  <td className=" p-3 text-center text-sm text-gray-600">
                    {i + 1 + rowsPerPage * (page - 1)}
                  </td>
                  <td className={styles.tableCell}>{entry.uniquename}</td>
                  <td className={styles.tableCell}>{entry.language}</td>
                  <td
                    className={
                      entry.status === "pass"
                        ? " p-3 text-sm text-green-600"
                        : " p-3 text-sm text-red-600"
                    }
                  >
                    {entry.status === "pass"
                      ? "correcto"
                      : entry.status === "fail"
                      ? "fallo"
                      : entry.status === "pending"
                      ? "pendiente"
                      : "?"}
                  </td>
                  <td className={styles.tableCell}>{entry.runtime}</td>
                  <td className={styles.tableCell}>
                    {entry.timeupdated.slice(0, 10) +
                      "_" +
                      entry.timeupdated.slice(11, 19)}
                  </td>
                  {/* <td>
                    <Link
                      to={`${entry.id}`}
                      key={entry.id}
                      className=" flex w-2/3 hover:cursor-pointer hover:underline"
                    >
                      Modificar
                      <ArrowRightIcon className=" h-6 w-5 pl-2 " />
                    </Link>
                  </td> */}
                </tr>
              );
            })}
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
