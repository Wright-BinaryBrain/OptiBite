import React, { useState, useEffect } from "react";
import "../main.css";
import Top from "./Top";
import Table from "./Table";
import AddOrder from "./AddOrder";
import ViewOrder from "./OrderView";
import EditOrder from "./EditOrder";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Order() {
  const [pop, setPop] = useState(false);
  const [vPop, setVPop] = useState(false);
  const [ePop, setEPop] = useState(false);
  const [eId, setEId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [lastIndex, setLastIndex] = useState();

  const [search, setSearch] = useState("");

  function showAdd() {
    setPop((prevValue) => !prevValue);
  }
  function RefreshC() {
    setRefresh((prevValue) => !prevValue);
  }

  //For View
  const [id, setId] = useState("1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [orderS, setOrderS] = useState("");
  const [orderA, setOrderA] = useState([1]);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [delivered, setDelivered] = useState("");
  const [pDate, setPDate] = useState("");
  const [pStatus, setPStatus] = useState("");
  const [pMethod, setPMethod] = useState("");

  const [oProducts, setOProducts] = useState([]);
  const [dCharge, setDCharge] = useState();

  const [data, setData] = useState([]);
  useEffect(() => {
    preFilled(id);
  }, [id]);

  const preFilled = (sno) => {
    setId(sno);
    let item = data?.find((entry) => entry._id === sno);

    const dateStr = item?.orderDate;
    const date = new Date(dateStr);

    const options = {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const nepalTime = date.toLocaleString("en-US", options);

    // console.log(item);
    setName(item?.guestName);
    setEmail(item?.email);
    setDate(nepalTime);
    setOrderS(item?.orderStatus);
    setOrderA(item?.quantity);
    setContact(item?.guestContact);
    setAddress(item?.orderAddress);
    setDelivered(item?.riderId);
    setPDate(item?.pDate);
    setPStatus(item?.paymentStatus);
    setPMethod(item?.paymentMethod);
    setOProducts(item?.productId);
    setDCharge(item?.dCharge);
  };

  function showView(id) {
    setId(id);
    setVPop((prevValue) => !prevValue);
  }

  function closeView() {
    setVPop((prevV) => !prevV);
  }

  function showEdit(id) {
    setEId(id);
    setEPop((prevValue) => !prevValue);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [resultPerPage, setResultPerPage] = useState(5);
  const [prevPage, setPrevPage] = useState(currentPage);

  function pageChange(e) {
    setCurrentPage(e);
  }

  const dataCount = (e) => {
    // console.log(e.count);
    setCount(e.count);
    setResultPerPage(e.resultPerPage);
    setData(e.data);
    setLastIndex(e.data.length);
  };
  const [orderStatus, setOrderStatus] = useState("");
  const [selected, setSelected] = useState(50);

  const filterClick = (e) => {
    setOrderStatus(e);
  };
  const [success, setSuccess] = useState({
    method: "",
    state: false,
  });
  useEffect(() => {
    if (success.state === true) {
      if (success.method === "post") {
        toast.success(`Order added sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      if (success.method === "put") {
        toast.success(`Order updated sucessfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } else if (success.state === false) {
      console.log(success);
    }
  }, [success]);

  console.log(success.state);

  const triggerSuccess = (e) => {
    setSuccess({ method: e.method, state: e.state });
  };
  return (
    <div className="main-container">
      {success.state ? <ToastContainer /> : ""}
      <div className="order-content">
        <Top
          title="Order Details"
          showAdd={showAdd}
          setSearch={setSearch}
          pageChange={pageChange}
          currentPage={currentPage}
          count={count}
          resultPerPage={resultPerPage}
          prevPage={prevPage}
          setCurrentPage={(e) => setCurrentPage(e)}
          setPrevPage={(e) => setPrevPage(e)}
          filterClick={(e) => setOrderStatus(e)}
          selected={(e) => setSelected(e)}
          lastIndex={lastIndex}
        />
        <Table
          search={search}
          showView={showView}
          setId={setId}
          dataCount={dataCount}
          page={currentPage}
          resultPerPage={resultPerPage}
          showEdit={showEdit}
          setEId={setEId}
          orderStatus={orderStatus}
          selected={selected}
          refresh={refresh}
          RefreshC={RefreshC}
          pageChange={pageChange}
        />
      </div>
      <AddOrder
        pop={pop}
        showAdd={showAdd}
        RefreshC={RefreshC}
        triggerSuccess={triggerSuccess}
      />

      <ViewOrder vPop={vPop} showView={closeView} id={id} RefreshC={RefreshC} />
      <EditOrder
        pop={ePop}
        showAdd={showEdit}
        id={eId}
        RefreshC={RefreshC}
        triggerSuccess={triggerSuccess}
      />
    </div>
  );
}

export default Order;
