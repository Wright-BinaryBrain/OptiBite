import TableBody from "./TableBody";
import TableHead from "./TableHead";

import { useEffect, useState } from "react";
import _, { includes } from "lodash";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Btns from "../admin/admin-nav/btns";
import Input from "../admin/update/input";
import Search from "../admin/search";
import axios from "axios";

const rowSize = 50;
export default function Table({
  columns,
  data,
  toggleRefresh,
  url, //route to get all paginated data
  preFilled, //for getting data for input fields during update
  refresh,
  add, // for triggering Add button
  update, // for triggering update button
  fileName, // for determining export file name
  classN,
  searchClass,
  searchPlaceholder,
  delUrl, //just include delete route without / and id
  ...props
}) {
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState(rowSize);
  const [search, setSearch] = useState("");
  const [paginatedPost, setPaginatedPost] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [showIndex, setShowIndex] = useState(true);
  const [rePage, setrePage] = useState(0);
  // const [refresh, setRefresh] = useState(false);
  // const [columns, setColumns] = useState(col);
  // const searchTable = (newSearch) => {
  //   setSearch(newSearch);
  // };
  console.log(data);
  const [perpage, setPerPage] = useState();

  // useEffect(() => {
  //   console.log(url);
  //   setTableData(data);
  //   setPaginatedPosts(
  //     _(data)
  //       .slice((currentPage - 1) * selected)
  //       .take(selected)
  //       .value()
  //   );
  // }, [data]);

  const [count, setCount] = useState(0);
  // const [resultPerPage, setResultPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
  const [prevPage, setPrevPage] = useState(currentPage);
  const [sorting, setSorting] = useState("");

  useEffect(() => {
    fetchData();
    if (currentPage * selected >= count && currentPage > 1) {
      console.log("asdfg");
      if (paginatedPost.length === 0) {
        console.log("aaaasdd");
        setCurrentPage(currentPage - 1);
      }
    }
  }, [
    currentPage,
    searchKeyword,
    filterOptions,
    refresh,
    url,
    paginatedPost.length,
    selected,
    sorting,
  ]);
  console.log(paginatedPost.length);

  const fetchData = async () => {
    try {
      // if (url === "http://localhost:4000/api/v1/getProducts") {
      //   console.log("here");

      if (url === "http://localhost:4000/api/v1/getAllUser") {
        const response = await axios.get(
          `http://localhost:4000/api/v1/getAllUser`,
          {
            params: {
              keyword: searchKeyword,
              page: currentPage,
              role: "customer",
              rowsPerPage: selected,
              sorting: sorting,
            },
            withCredentials: true,
          }
        );
        const { data, count } = response.data;
        const totalData = await axios.get(`${url}`, { withCredentials: true });
        const filteredData = totalData.data.data.filter(
          (entry) => entry.role === "customer"
        );
        console.log(totalData);
        setTableData(data);
        setPaginatedPost(data);
        setCount(filteredData.length);
      } else {
        const response = await axios.get(`${url}`, {
          params: {
            keyword: searchKeyword,
            page: currentPage,
            rowsPerPage: selected,
            sorting: sorting,
          },
          withCredentials: true,
        });
        const { data, count } = response.data;
        setTableData(data);
        setPaginatedPost(data);
        setCount(count);
      }

      // } else {
      //   const response = await axios.get(`${url}`, {
      //     withCredentials: true,
      //   });
      //   const { data } = response.data;
      //   setTableData(data);
      //   setPaginatedPost(data);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSearch = (e) => {
    setSearchKeyword(e);
    if (prevPage > 1) {
      if (!e) {
        setCurrentPage(prevPage);
      } else {
        setCurrentPage(1);
      }
    }
  };

  const handleSorting = (sort, sortOrder) => {
    if (sort) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sort] === null) return 1;
        if (b[sort] === null) return -1;
        if (a[sort] === null && b[sort] === null) return 0;
        return (
          a[sort].toString().localeCompare(b[sort].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);

      // Update paginatedPost based on the sorted data
      const startIndex = (currentPage - 1) * selected;
      setPaginatedPost(_(sorted).slice(startIndex).take(selected).value());
      setSorting("");
    }
  };
  const handleSortingAlt = (order, head) => {
    console.log(head, order);
    if (head === "productName") {
      if (order === "asc") {
        setSorting("DescendingAlphabetically");
      }
      if (order === "desc") {
        setSorting("AscendingAlphabetically");
      }
    } else if (head === "rate") {
      if (order === "asc") {
        setSorting("DescendingRate");
      }
      if (order === "desc") {
        setSorting("AscendingRate");
      }
    } else {
      setSorting("");
    }
  };

  console.log(sorting);

  const pageCount = tableData ? Math.ceil(count / rowSize) : 0;
  const pages = _.range(1, pageCount + 1);
  const newCount = tableData ? Math.ceil(count / selected) : 0; //for calculating pages after changing rowSize
  const newPages = _.range(1, newCount + 1);
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);

    const startIndex = (pageNo - 1) * selected;

    setPaginatedPost(_(tableData).slice(startIndex).take(selected).value());
  };
  // const change = (pageNo) => {
  //   setRowSize(50);
  //   setCurrentPage(pageNo);
  //   const startIndex = (pageNo - 1) * rowSize;
  //   setPaginatedPost(_(tableData).slice(startIndex).take(rowSize).value());
  // };
  // const updateId = (id) => {
  //   if (count > 0) {
  //     data?.slice(id - count).map((e) => {
  //       const uID = { id: e.id - count };
  //       let jsonD = Object.assign(e, uID);
  //       let jsonS = JSON.stringify(jsonD);
  //       console.log(jsonS);
  //       fetch(`${url}/${e.id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: jsonS,
  //       });
  //     });
  //   } else {
  //     data?.slice(id).map((e) => {
  //       console.log(e);
  //     });
  //   }
  // };

  // const Search = () => {
  //   const [searchValue, setSearchValue] = useState("");

  //   // const submitForm = (e) => {
  //   //   // e.preventDefault();
  //   //   setSearch(searchValue);
  //   //   const newData = paginatedPost.filter(
  //   //     (x) =>
  //   //       x[searchName].toLowerCase() ===
  //   //       (searchValue.toLowerCase() === ""
  //   //         ? x[searchName].toLowerCase()
  //   //         : searchValue.toLowerCase())
  //   //   );

  //   //   if (/^\d+$/.test(searchValue)) {
  //   //     const idData = paginatedPost.filter(
  //   //       (x) =>
  //   //         String(x[idNum]).toLowerCase() ===
  //   //         (searchValue.toLowerCase() === ""
  //   //           ? String(x[idNum]).toLowerCase()
  //   //           : searchValue)
  //   //     );
  //   //     // console.log(idData);
  //   //     setPaginatedPost(idData);
  //   //     console.log(paginatedPost);
  //   //   } else {
  //   //     setPaginatedPost(newData);
  //   //   }

  //   //   setShowIndex(false);

  //   //   e.preventDefault();
  //   // };

  //   // const clear = () => {
  //   //   pagination(currentPage);
  //   //   setShowIndex(true);
  //   //   setSelected(50);
  //   // };

  //   return (
  //     <div className={`top-container ${props.topclass}`}>
  //       <div className={`search-container ${searchClass}`}>
  //         <input
  //           type="search"
  //           name="tableSearch"
  //           value={searchKeyword}
  //           onChange={handleSearch}
  //           className="tablesearch"
  //           placeholder={searchPlaceholder}
  //         />

  //         {/* <button onClick={clear} className="clear-search">
  //           Clear
  //         </button> */}
  //       </div>

  //       <div className={props.searchBtnClass}>
  //         <Btns add={add} ex={data} fileName={fileName} />
  //       </div>
  //       {/* <button onClick={change(currentPage - 1)}>a</button> */}
  //     </div>
  //   );
  // };
  const fIndex = () => {
    // const x = (currentPage - 1) * resultPerPage + 1;
    const x = 1;
    return <span>{x}</span>;
  };

  console.log(prevPage);

  const lIndex = () => {
    // const x = (currentPage - 1) * resultPerPage + paginatedPost?.length;
    const x = paginatedPost?.length;
    return <span>{x}</span>;
  };

  const changes = (e) => {
    setSelected(e);
    const startIndex = (currentPage - 1) * rowSize;
    // setPaginatedPost(_(tableData).slice(startIndex).take(e).value());
  };
  console.log(currentPage);
  return (
    <>
      <div className={classN}>
        <div className={`top-container ${props.topclass}`}>
          <Search
            onSearch={handleSearch}
            placeholder={searchPlaceholder}
            // searchClass="new-search"
          />
          <div className={props.searchBtnClass}>
            <Btns add={add} ex={data} fileName={fileName} />
          </div>
        </div>

        <div className="navigation">
          <div className="select-rows">
            <select
              name=""
              id=""
              value={selected}
              onChange={(e) => changes(e.target.value)}
            >
              {pages.map((e) => {
                return (
                  <>
                    <option value={e * rowSize}>{e * rowSize}</option>
                  </>
                );
              })}
            </select>
            {"  "}per page |
          </div>
          <span>
            {!showIndex ? (
              <>
                {"  "}
                {paginatedPost.length} - {paginatedPost.length}
                {"  "}
              </>
            ) : (
              <>
                {fIndex()} - {lIndex()}
                {"  "}
              </>
            )}
            of {count}
            {"  "}
          </span>
          <span className="navigation-btn-container">
            <button
              // onClick={() => {
              //   pagination(currentPage - 1);
              // }}
              // disabled={currentPage > 1 ? "" : true}
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setPrevPage(currentPage - 1);
              }}
            >
              <AiOutlineLeft />
            </button>
            <button
              // onClick={() => pagination(currentPage + 1)}
              // disabled={currentPage < newCount ? "" : true}
              disabled={currentPage * selected >= count}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                setPrevPage(currentPage + 1);
              }}
            >
              <AiOutlineRight />
            </button>
          </span>
        </div>

        <div className="table-container-admin">
          <table className="react-table">
            <TableHead
              columns={columns}
              handleSorting={handleSorting}
              handleSortingAlt={handleSortingAlt}
            />
            <TableBody
              columns={columns}
              totalData={data}
              tableData={paginatedPost}
              delUrl={delUrl}
              preFilled={preFilled}
              update={update}
              selected={selected}
              toggleRefresh={toggleRefresh}
              del={props.del}
            />
          </table>
        </div>

        <div className="page-container">
          {newPages.map((e) => {
            return (
              <span
                className={`page-number ${
                  currentPage === e ? "page-select" : ""
                }`}
                onClick={() => {
                  setCurrentPage(e);
                  setPrevPage(e);
                }}
              >
                {e}
              </span>
            );
          })}
        </div>
      </div>

      <div></div>
    </>
  );
}
