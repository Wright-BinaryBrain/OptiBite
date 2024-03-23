import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export default function TableHead({
  columns,
  handleSorting,
  handleSortingAlt,
}) {
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder = accessor === sort && order === "asc" ? "desc" : "asc";
    setSort(accessor);
    setOrder(sortOrder);
    if (accessor === "productName" || accessor === "rate") {
      handleSortingAlt(sortOrder, accessor);
    } else {
      handleSorting(accessor, sortOrder);
    }
  };

  const SortIcons = ({ isActive }) => {
    return (
      <>
        <span
          className={`order-up ${isActive && order === "asc" ? "dim" : ""}`}
        >
          <AiOutlineArrowUp />
        </span>
        <span
          className={`order-down ${isActive && order === "desc" ? "dim" : ""}`}
        >
          <AiOutlineArrowDown />
        </span>
      </>
    );
  };

  return (
    <>
      <thead>
        <tr className="table-rows">
          {columns?.map(({ label, accessor, sortable }) => {
            const isActive = accessor === sort; // Check if the current column is active
            console.log(isActive);
            return (
              <th
                id={accessor}
                key={accessor}
                onClick={
                  sortable
                    ? () => {
                        handleSortingChange(accessor);
                      }
                    : null
                }
                className={isActive ? "active" : ""}
              >
                {label}
                {sortable ? <SortIcons isActive={isActive} /> : ""}
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
}
