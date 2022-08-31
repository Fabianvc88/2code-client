import { ArrowRightIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const headers = [
    "#",
    "id",
    "Email",
    "Nombre",
    "Apellido",
    "Usuario",
    "Rol",
    " ",
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
                      i > 1 ? styles.tableHeader : styles.tableIdHeader
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
                  {Object.entries(entry).map((property) => {
                    return (
                      <td
                        className={
                          property[0] === "id"
                            ? styles.idCell
                            : styles.tableCell
                        }
                      >
                        {property[1]}
                      </td>
                    );
                  })}
                  <td>
                    <Link
                      to={`${entry.id}`}
                      key={entry.id}
                      className=" flex w-2/3 hover:cursor-pointer hover:underline"
                    >
                      Modificar
                      {/* <ArrowRightIcon className=" h-6 w-5 pl-2 " /> */}
                    </Link>
                  </td>
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
