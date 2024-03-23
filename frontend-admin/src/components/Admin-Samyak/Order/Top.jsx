import React, { useEffect, useState } from "react";
import Input from "./Input";
import _, { includes } from "lodash";
import axios from "axios";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Top(props) {
  const [status, setStatus] = useState("");
  const [count, setCount] = useState();
  const rowSize = 50;
  const fetch = async () => {
    const totalData = await axios.get(
      `https://backend.sabjiland.com/api/v1/getAllOrder`,
      { params: { orderStatus: status }, withCredentials: true }
    );
    setCount(totalData.data.data?.length);
  };

  useEffect(() => {
    setCount(props.count);
  }, [props.count]);

  useEffect(() => {
    if (status != "") {
      fetch();
    } else {
      setCount(props.count);
    }

    props.filterClick(status);
    props.setCurrentPage(1);
    console.log("count", props.count);
  }, [status]);

  const [selected, setSelected] = useState(50);

  useEffect(() => {
    props.selected(selected);
  }, [selected]);
  const pageCount = props.count ? Math.ceil(count / rowSize) : 0;
  const pages = _.range(1, pageCount + 1);

  const handleSearch = (e) => {
    props.setSearch(e);
    if (props.prevPage > 1) {
      if (!e) {
        props.setCurrentPage(props.prevPage);
      } else {
        props.setCurrentPage(1);
      }
    }
  };
  return (
    <>
      <div className="top">
        <h1 className="admin-title">{props.title}</h1>
        <div className="filter">
          <div
            className={`filter-item ${status === "" ? "active" : ""}`}
            onClick={() => {
              setStatus("");
            }}
          >
            <button>All</button>
          </div>
          <div
            className={`filter-item ${status === "Pending" ? "active" : ""}`}
            onClick={() => {
              setStatus("Pending");
            }}
          >
            <button>Pending</button>
          </div>
          <div
            className={`filter-item ${status === "In Process" ? "active" : ""}`}
            onClick={() => {
              setStatus("In Process");
            }}
          >
            <button>In Process</button>
          </div>
          <div
            className={`filter-item ${
              status === "Being Delivered" ? "active" : ""
            }`}
            onClick={() => {
              setStatus("Being Delivered");
            }}
          >
            <button>Being Delivered</button>
          </div>
          <div
            className={`filter-item ${status === "Completed" ? "active" : ""}`}
            onClick={() => {
              setStatus("Completed");
            }}
          >
            <button>Completed</button>
          </div>
          <div
            className={`filter-item ${status === "Cancelled" ? "active" : ""}`}
            onClick={() => {
              setStatus("Cancelled");
            }}
          >
            <button>Cancelled</button>
          </div>
        </div>
        <div className="sort">
          <div className="search">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
              >
                <path
                  fill="black"
                  d="M10.917 9.667h-.659l-.233-.225a5.392 5.392 0 0 0 1.308-3.525 5.417 5.417 0 1 0-5.416 5.416 5.392 5.392 0 0 0 3.525-1.308l.225.233v.659l4.166 4.158 1.242-1.242-4.158-4.166Zm-5 0a3.745 3.745 0 0 1-3.75-3.75 3.745 3.745 0 0 1 3.75-3.75 3.745 3.745 0 0 1 3.75 3.75 3.745 3.745 0 0 1-3.75 3.75Z"
                />
              </svg>
            </div>
            <div>
              <Input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                placeholder="Search by user name"
              />
            </div>
          </div>
          <div className="top-btns">
            <div className="export-btn">
              <button>
                Export
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.916 1.417H4.25a1.417 1.417 0 0 0-1.417 1.416v11.334a1.417 1.417 0 0 0 1.417 1.416h8.5a1.417 1.417 0 0 0 1.416-1.416v-8.5l-4.25-4.25Z"
                  />
                  <path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.917 1.417v4.25h4.25M11.334 9.208H5.667M11.334 12.042H5.667M7.084 6.375H5.667"
                  />
                </svg>
              </button>
            </div>
            <div className="add-btn">
              <button onClick={props.showAdd}>
                Add
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <path
                    fill="#fff"
                    d="M8.112 12.303a.737.737 0 0 0 .543-.22.735.735 0 0 0 .218-.54V9.26h2.3a.704.704 0 0 0 .533-.219.752.752 0 0 0 .21-.541.736.736 0 0 0-.22-.542.735.735 0 0 0-.541-.219H8.873v-2.3a.705.705 0 0 0-.218-.533.755.755 0 0 0-.543-.209.735.735 0 0 0-.541.218.736.736 0 0 0-.22.543v2.281h-2.3a.705.705 0 0 0-.532.219.755.755 0 0 0-.21.542c0 .215.073.396.219.541a.737.737 0 0 0 .542.22h2.282v2.3c0 .216.073.393.219.533.145.139.326.209.541.209Zm0 3.803c-1.052 0-2.04-.2-2.966-.6a7.675 7.675 0 0 1-2.415-1.625 7.675 7.675 0 0 1-1.625-2.415c-.4-.925-.6-1.914-.6-2.966 0-1.052.2-2.04.6-2.966.4-.926.941-1.73 1.625-2.415a7.686 7.686 0 0 1 2.415-1.626A7.41 7.41 0 0 1 8.112.894c1.053 0 2.041.2 2.967.599.925.4 1.73.941 2.414 1.626a7.676 7.676 0 0 1 1.626 2.415c.4.925.6 1.914.6 2.966 0 1.052-.2 2.04-.6 2.966-.4.926-.941 1.73-1.626 2.415a7.676 7.676 0 0 1-2.414 1.625c-.926.4-1.914.6-2.967.6Zm0-1.522c1.686 0 3.122-.592 4.307-1.777 1.185-1.186 1.778-2.621 1.778-4.307 0-1.686-.592-3.122-1.777-4.307-1.186-1.185-2.622-1.778-4.308-1.778-1.685 0-3.12.593-4.306 1.778C2.621 5.378 2.028 6.814 2.028 8.5c0 1.686.593 3.121 1.778 4.307 1.185 1.185 2.62 1.777 4.306 1.777Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="navigation">
          <div className="select-rows">
            <select
              name=""
              id=""
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
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
          1 - {props.lastIndex} of {props.lastIndex}
          <span className="navigation-btn-container">
            <button
              // onClick={() => {
              //   pagination(currentPage - 1);
              // }}
              // disabled={currentPage > 1 ? "" : true}
              disabled={props.currentPage === 1}
              onClick={() => {
                props.pageChange(props.currentPage - 1);
                props.setPrevPage(props.currentPage - 1);
              }}
            >
              <AiOutlineLeft />
            </button>
            <button
              // onClick={() => pagination(props.currentPage + 1)}
              // disabled={props.currentPage < newCount ? "" : true}
              disabled={props.currentPage * selected >= count}
              onClick={() => {
                props.pageChange(props.currentPage + 1);
                props.setPrevPage(props.currentPage + 1);
              }}
            >
              <AiOutlineRight />
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
export default Top;
