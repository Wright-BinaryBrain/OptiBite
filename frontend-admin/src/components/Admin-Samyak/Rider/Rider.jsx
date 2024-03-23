import React, { useEffect, useState } from "react";
import Top from "../Rider/Top";
import Table from "./Table";
import RiderAdd from "./RiderAdd";
import RiderEdit from "./RiderEdit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Rider() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const [editId, setEditId] = useState("");
  const [refresh, setRefersh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [resultPerPage, setResultPerPage] = useState(5);
  const [prevPage, setPrevPage] = useState(currentPage);
  function pageChange(e) {
    setCurrentPage(e);
  }
  function ToggleShow() {
    setShowAdd((prevValue) => !prevValue);
  }
  function ToggleEdit() {
    setShowEdit((prevValue) => !prevValue);
  }
  function RefreshC() {
    setRefersh((prevV) => !prevV);
  }

  console.log(refresh);
  const dataCount = (e) => {
    // console.log(e.count);
    setCount(e.count);
    setResultPerPage(e.resultPerPage);
    setData(e.data);
    setLastIndex(e.data.length);
  };
  const [selected, setSelected] = useState(50);
  const [lastIndex, setLastIndex] = useState();

  const [success, setSuccess] = useState({
    method: "",
    state: false,
  });
  useEffect(() => {
    if (success.state === true) {
      if (success.method === "post") {
        toast.success(`Rider added sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      if (success.method === "put") {
        toast.success(`Rider updated sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } else if (success.state === false) {
      console.log(success);
    }
  }, [success]);

  const triggerSuccess = (e) => {
    setSuccess({ method: e.method, state: e.state });
  };

  return (
    <div className="main-container">
      {success.state ? <ToastContainer /> : ""}
      <div className="order-content">
        <Top
          title="Rider Details"
          ToggleShow={ToggleShow}
          setSearch={setSearch}
          pageChange={pageChange}
          currentPage={currentPage}
          count={count}
          resultPerPage={resultPerPage}
          prevPage={prevPage}
          setCurrentPage={(e) => setCurrentPage(e)}
          setPrevPage={(e) => setPrevPage(e)}
          selected={(e) => setSelected(e)}
          lastIndex={lastIndex}
        />
        <Table
          ToggleEdit={ToggleEdit}
          search={search}
          dataCount={dataCount}
          page={currentPage}
          resultPerPage={resultPerPage}
          setId={setEditId}
          refresh={refresh}
          RefreshC={RefreshC}
          pageChange={pageChange}
        />
      </div>
      <RiderAdd
        showAdd={showAdd}
        ToggleShow={ToggleShow}
        RefreshC={RefreshC}
        triggerSuccess={triggerSuccess}
      />
      <RiderEdit
        showEdit={showEdit}
        ToggleEdit={ToggleEdit}
        id={editId}
        RefreshC={RefreshC}
        triggerSuccess={triggerSuccess}
      />
    </div>
  );
}

export default Rider;
