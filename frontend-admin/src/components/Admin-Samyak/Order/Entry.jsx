import React, { useEffect } from "react";
import ButtonT from "../ButtonToggle";
import { useState } from "react";
import axios from "axios";
import { orderBy } from "lodash";

function Entry(props) {
  const [pColor, setPColor] = useState("");
  const [oColor, setOColor] = useState("");
  const [rColor, setRColor] = useState("");
  const [riders, setRiders] = useState();

  const changeClassP = (e) => {
    let val = e.target.value;
    setPColor(val);
    // console.log(`id from dd: ${props.id}`);
    handleChange(e, props.id);
  };

  const changeClassO = (e) => {
    let val = e.target.value;
    setOColor(val);
    // console.log(`id from dd: ${props.id}`);
    handleChange(e, props.id, props.pStatus);
  };

  // useEffect(() => {
  //   console.log("payment", props.pStatus);
  //   setPColor(props.pStatus);
  // }, [props.refresh]);
  // useEffect(() => {
  //   setOColor(props.oStatus);
  // }, [props.ostatus]);

  // const changeClassR = (e) => {
  //   let val = e.target.value;
  //   setRColor(val);
  //   handleChange(props.id, props.);;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:4000api/v1/getAllRider`
  //       );
  //       const json = await response.json();
  //       setRiders(json.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //Dropdown onchange
  const [dropId, setDropId] = useState("");
  const [oData, setOData] = useState({
    orderStatus: "",
    paymentStatus: "",
  });

  function handleChange(event, id) {
    const { name, value } = event.target;
    setDropId(id);
    const odata =
      name === "paymentStatus"
        ? { paymentStatus: value }
        : { orderStatus: value };
    axios
      .patch(`http://localhost:4000/api/v1/updateOrder/${id}`, odata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        props.RefreshC();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {}, [handleChange]);

  return (
    <tr key={props.id}>
      <td>{props.uname}</td>
      <td>{props.date}</td>
      <td>
        {/* {props.amount.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )} */}
        {props.amount}
      </td>
      <td>
        <select
          onChange={changeClassP}
          name="paymentStatus"
          value={props.pStatus}
          className={
            props.pStatus === "Paid"
              ? "Paid"
              : props.pStatus === "Unpaid"
              ? "Unpaid"
              : "Refunded"
          }
          id="paymentS"
        >
          <option value={"Paid"}>Paid</option>
          <option value={"Unpaid"}>Unpaid</option>
          <option value={"Refunded"}>Refunded</option>
        </select>
      </td>
      <td>
        <select
          onChange={changeClassO}
          value={props.oStatus}
          name="orderStatus"
          className={
            props.oStatus === "Completed"
              ? "Completed"
              : props.oStatus === "InProcess"
              ? "In Process"
              : props.oStatus === "BeingDelivered"
              ? "Being Delivered"
              : props.oStatus === "Pending"
              ? "Pending"
              : "Cancelled"
          }
          id="orderS"
        >
          <option value={"Pending"}>Pending</option>
          <option value={"In Process"}>In Process</option>
          <option value={"Being Delivered"}>Being Delivered</option>
          <option value={"Completed"}>Completed</option>
          <option value={"Cancelled"}>Cancelled</option>
        </select>
      </td>
      {/* <td>
        <select
          onChange={changeClassR}
          value={rColor}
          name=""
          className={rColor === "" ? "Unassigned" : "Paid"}
          id="riderA"
        >
          <option value="">Assign</option>
          {riders?.map((e) => {
            return <option value={e._id}>{e.riderName}</option>;
          })}
        </select>
      </td> */}
      <ButtonT
        delOrder={props.delOrder}
        showView={props.showView}
        setId={props.setId}
        id={props.id}
        showEdit={props.showEdit}
      />
    </tr>
  );
}

export default Entry;
