import React, { useState, useEffect } from "react";
import Entry from "./Entry";
// import data from "./riderData";
import axios from "../Axios";
import _ from "lodash";

function Table(props) {
  const [count, setCount] = useState();
  const [data, setData] = useState([]);
  console.log("aaa", props.refresh);
  const getApiData = async () => {
    try {
      const params = {
        keyword: props.search,
        page: props.page,
        rowsPerPage: props.selected,
      };

      const res = await axios.get("http://localhost:4000/api/v1/getAllRider", {
        params,
        withCredentials: true,
      });
      console.log(res);
      const dataProp = {
        data: res.data.data,
        count: res.data.count,
        resultPerPage: res.data.resultPerPage,
      };
      props.dataCount(dataProp);
      setData(dataProp.data);
      setCount(dataProp.count);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  console.log(count);

  useEffect(() => {
    getApiData();
  }, [props.search, props.page, props.selected, props.refresh]);
  console.log(data);
  function deleteRider() {
    axios
      .delete("")
      .then((res) => {
        console.log(res);
        props.RefreshC();
      })
      .catch((err) => console.log(err.message));
  }

  function createEntry(empTerm, index) {
    return (
      <Entry
        key={index}
        id={empTerm._id}
        uname={empTerm.riderName}
        contact={empTerm.contact}
        address={empTerm.address}
        email={empTerm.email}
        image={empTerm.image[0]}
        setId={props.setId}
        toggleEdit={props.ToggleEdit}
        RefreshC={props.RefreshC}
      />
    );
  }
  const pageCount = count ? Math.ceil(count / props.selected) : 0; //for calculating pages after changing rowSize
  const pages = _.range(1, pageCount + 1);
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Contact No.</th>
              <th>Address</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          {data.map(createEntry)}
        </table>
      </div>
      <div className="page-container">
        {pages.map((e) => {
          return (
            <span
              className={`page-number ${props.page === e ? "page-select" : ""}`}
              onClick={() => {
                props.pageChange(e);
              }}
            >
              {e}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default Table;
