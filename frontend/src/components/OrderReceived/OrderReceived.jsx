import React from "react";
import CartProcess from "../CartProcess/CartProcess.jsx";
import OrderDetails from "./OrderDetails.jsx";

function OrderReceived() {
  return (
    <div className="ordrecv-container">
      <div className="ordrecv-path">
        Home&nbsp;&gt;&nbsp;
        <span style={{ color: "#BE4217" }}>
          Checkout&nbsp;&gt;&nbsp;Order Received
        </span>
      </div>
      <CartProcess />
      <OrderDetails />
    </div>
  );
}

export default OrderReceived;
