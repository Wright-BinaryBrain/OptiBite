import React, { useEffect, useState } from "react";
import OrderNow from "./OrderNow.jsx";
import CartProcess from "../CartProcess/CartProcess.jsx";
import "./billingDetails.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BillingDetails(props) {
  const [userDetails, setUserDetails] = useState({});
  const [editAddress, setEditAddress] = useState(true);
  const [address, setAddress] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.user);
        setUserDetails(res.data.user);
        setAddress(res.data.user.address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");

  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

  let currentYear = date.getFullYear();

  // we will display the date as DD-MM-YYYY

  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  const navigate = useNavigate();
  return (
    <div className="billing-container">
      <div className="billing-path">
        Home&nbsp;&gt;&nbsp;
        <span style={{ color: "#BE4217" }}>
          Cart&nbsp;&gt;&nbsp;Billing Detail
        </span>
      </div>
      {/* <CartProcess /> */}
      <div className="order-now-container">
        <div className="billing-details">
          <div className="billing-details-heading">Billing Detail</div>
          <div className="billing-details-content">
            <div className="billing-details-content-data">
              <div className="billing-details-content-data-heading">
                Receiver's Name:
              </div>
              <div className="billing-details-content-data-contents">
                {userDetails.name}
              </div>
            </div>
            <div className="billing-details-content-data">
              <div className="billing-details-content-data-heading">
                Contact No.
              </div>
              <div className="billing-details-content-data-contents">
                {userDetails.contactNo1}
              </div>
            </div>
            <div className="billing-details-content-data">
              <div className="billing-details-content-data-heading">
                Delivery Address
              </div>
              <div className="billing-details-content-data-contents">
                <input
                  type="text"
                  value={address}
                  disabled
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                {/* <span onClick={() => setEditAddress((prev) => !prev)}>{editAddress? "Edit" :  "Done"}</span> */}
                <span onClick={() => navigate("/view")}>Edit</span>
              </div>
            </div>
            <div className="billing-details-content-data">
              <div className="billing-details-content-data-heading">
                Order Date:
              </div>
              <div className="billing-details-content-data-contents">
                {currentDate}
              </div>
            </div>
          </div>
        </div>
        <div>
          <OrderNow isOrderCart={props.isOrderCart} />
        </div>
      </div>
    </div>
  );
}

export default BillingDetails;
