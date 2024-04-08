import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderNow(props) {
  const navigate = useNavigate();
  const [buyProduct, setBuyProduct] = useState(
    JSON.parse(localStorage.getItem("optibiteBuyProduct"))
  );
  const [quantity, setQuantity] = useState(
    JSON.parse(localStorage.getItem("optibiteQuantity"))
  );

  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartItemsList, setCartItemsList] = useState(0);
  var subTotal = 0;
  var cartList;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
      cartList = [];
    } else {
      cartList = JSON.parse(localStorage.getItem("optibiteAddToCart"));
    }
    setCartItemsList(cartList.length);

    for (let i = 0; i < cartList.length; i++) {
      console.log(cartList[i].qtyBtn);
      console.log(cartList[i].Rate);
      subTotal = cartList[i].qtyBtn * cartList[i].Rate + subTotal;
    }
    setTotalAmount(subTotal);
    setGrandTotal(subTotal + 100);
  }, []);

  function GoToPayment() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    navigate("/payment");
  }
  return (
    <div className="place-order-summary">
      <div className="place-order-title">ORDER SUMMARY</div>
      <div className="place-order-details">
        <div className="place-order-flex">
          <div>Sub Total</div>
          <div>
            Rs.{" "}
            {JSON.parse(localStorage.getItem("optibiteBuyProduct")) === null
              ? totalAmount
              : buyProduct.rate * quantity}
          </div>
        </div>
        <div style={{ fontSize: "12px" }}>
          (
          {JSON.parse(localStorage.getItem("optibiteBuyProduct")) === null
            ? `${cartItemsList} item/s`
            : "1 item"}
          )
        </div>
        <div className="place-order-flex">
          <div>Delivery Charge</div>
          <div>Rs 100/-</div>
        </div>
      </div>
      <div
        className="place-order-total"
        style={{ justifyContent: "space-between" }}
      >
        <div className="place-order-flex">
          <div>Total</div>
          <div>
            Rs.{" "}
            {JSON.parse(localStorage.getItem("optibiteBuyProduct")) === null
              ? grandTotal
              : buyProduct.rate * quantity + 100}
          </div>
        </div>
      </div>
      <div className="place-order-terms">
        <div>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </div>
        <div className="place-order-check-container">
          <div>
            <input
              className="place-order-terms-checkbox"
              type="checkbox"
              id="place-order-terms-checkbox-1"
              name="place-order-terms-checkbox"
              value="place-order-terms-checkbox"
            />
          </div>
          <div>I have read and agree to the optibite terms and conditions</div>
        </div>
        <button
          className="place-order-button"
          onClick={() =>
            document.getElementById("place-order-terms-checkbox-1").checked
              ? GoToPayment()
              : null
          }
        >
          <input
            type="submit"
            name="submit-place-order"
            value="submit-place-order"
            className="submit-place-order"
          />
          <div className="place-order-btn-text">PLACE ORDER</div>
        </button>
      </div>
    </div>
  );
}

export default OrderNow;
