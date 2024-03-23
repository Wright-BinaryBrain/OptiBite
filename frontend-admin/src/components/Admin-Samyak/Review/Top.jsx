import React, { useEffect, useState } from "react";
import Input from "../Order/Input";
import _, { includes } from "lodash";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Top(props) {
  const [count, setCount] = useState();
  useEffect(() => {
    setCount(props.count);
  }, [props.count]);
  const rowSize = 2;

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

  const [selected, setSelected] = useState(2);
  useEffect(() => {
    props.selected(selected);
  }, [selected]);
  const pageCount = props.count ? Math.ceil(count / selected) : 0;
  const pages = _.range(1, pageCount + 1);

  return (
    <>
      <div className="top">
        <h1 className="admin-title">{props.title}</h1>

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
                  transform="scale(1)"
                  d="M10.917 9.667h-.659l-.233-.225a5.392 5.392 0 0 0 1.308-3.525 5.417 5.417 0 1 0-5.416 5.416 5.392 5.392 0 0 0 3.525-1.308l.225.233v.659l4.166 4.158 1.242-1.242-4.158-4.166Zm-5 0a3.745 3.745 0 0 1-3.75-3.75 3.745 3.745 0 0 1 3.75-3.75 3.745 3.745 0 0 1 3.75 3.75 3.745 3.745 0 0 1-3.75 3.75Z"
                />
              </svg>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Search for Review"
                onChange={(e) => handleSearch(e.target.value)}
              />
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
