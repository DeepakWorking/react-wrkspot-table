import React from "react";
import { useTable } from "react-table";

const columns = [
  {
    Header: "Country Name",
    accessor: "name",
    id: "name",
  },
  {
    Header: "Code",
    accessor: "abbreviation",
    id: "code",
  },
  {
    Header: "Capital",
    accessor: "capital",
    id: "capital",
  },
  {
    Header: "Phone Code",
    accessor: "phone",
    id: "phone",
  },
  {
    Header: "Population",
    accessor: "population",
    id: "population",
  },
  {
    Header: "Flag",
    accessor: "media.flag",
    Cell: ({ value }) => (
      <img src={value} alt="Flag" style={{ width: "50px" }} />
    ),
    id: "flag",
  },
  {
    Header: "Emblem",
    accessor: "media.emblem",
    Cell: ({ value }) => (
      <img src={value} alt="Flag" style={{ width: "50px" }} />
    ),
    id: "emblem",
  },
];

const Countriestable = ({ data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table {...getTableProps()} className="country-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="header-cell">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="countries-row">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="countries-cell">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(Countriestable);
