import React, { useState } from "react";
import { useEffect } from "react";

function CartOrderSummary(props) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartEmpty, setCartEmpty] = useState();
  const [cartItemsList, setCartItemsList] = useState(0);
  var subTotal = 0;
  var cartList;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
      cartList = [];
      setCartEmpty(true);
    } else {
      cartList = JSON.parse(localStorage.getItem("optibiteAddToCart"));
      setCartEmpty(false);
      setCartItemsList(cartList.length);
    }

    for (let i = 0; i < cartList.length; i++) {
      subTotal = cartList[i].qtyBtn * cartList[i].Rate + subTotal;
    }
    setTotalAmount(subTotal);
    setGrandTotal(subTotal + 2);
  }, [props.addedToCart]);

  return (
    <div className="mycart-order-summary">
      <div className="mycart-order-title">ORDER SUMMARY</div>
      <div className="mycart-order-details">
        <div className="mycart-order-flex">
          <div>Sub Total</div>
          <div>$ {totalAmount}</div>
        </div>
        <div style={{ fontSize: "12px" }}>{cartItemsList + " Item/s"}</div>
        <div className="mycart-order-flex">
          <div>Delivery Charge</div>
          <div>$ 2</div>
        </div>
      </div>
      <div
        className="mycart-order-total"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mycart-order-flex">
          <div>Total</div>
          <div>$ {grandTotal}</div>
        </div>
      </div>
    </div>
  );
}

export default CartOrderSummary;
