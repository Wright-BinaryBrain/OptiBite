import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
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
      subTotal = cartList[i].qtyBtn * cartList[i].Rate + subTotal;
    }
    setTotalAmount(subTotal);
    setGrandTotal(subTotal + 2);
  }, []);

  // *****************************************************************

  const [userDetail, setUserDetail] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", { withCredentials: true })
      .then((res) => {
        if (res.data.success === true) {
          setUserDetail(res.data.user);
        }
      })
      .catch((err) => console.log(err));

    cartItems = [JSON.parse(localStorage.getItem("optibiteBuyProduct"))];
  }, []);

  var cartItems;
  var cartId;
  var cartQty;
  var rates;

  const Order = (event) => {
    event.preventDefault();

    cartId = [];
    cartQty = [];
    rates = [];

    if (JSON.parse(localStorage.getItem("optibiteBuyProduct")) === null) {
      if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
        cartItems = [];
      } else {
        cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
      }

      for (let i = 0; i < cartItems.length; i++) {
        cartId.push(String(cartItems[i]._id));
        cartQty.push(String(cartItems[i].qtyBtn));
        rates.push(String(cartItems[i].Rate));
      }
    } else {
      if (JSON.parse(localStorage.getItem("optibiteBuyProduct")) === null) {
        cartItems = [];
      } else {
        cartItems = [JSON.parse(localStorage.getItem("optibiteBuyProduct"))];
        cartQty = [JSON.parse(localStorage.getItem("optibiteQuantity"))];
      }
      cartId = [cartItems[0]._id];
    }

    console.log(cartId);
    console.log(cartQty);
    console.log(rates);
    if (cartId.length !== 0 && cartQty.length !== 0) {
      const formData = new FormData();
      formData.append("userId", String(userDetail._id));

      cartId.forEach((value) => {
        formData.append("productId", value);
      });
      cartQty.forEach((value) => {
        formData.append("quantity", value);
      });
      rates.forEach((value) => {
        formData.append("rates", value);
      });

      formData.append("orderAddress", String(userDetail.Address));

      axios
        .post("http://localhost:4000/api/v1/postOrder", formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            toast.success("Thank you for Shopping with us.", {
              position: toast.POSITION.TOP_RIGHT,
            });
            console.log(res.data.data);
            props.setOrderQuantity(res.data.data.quantity);
            const data = res.data.data;
            console.log(data);
            props.setOrderResponse(data);

            navigate("/invoice");
          }
          if (JSON.parse(localStorage.getItem("optibiteBuyProduct")) === null) {
            localStorage.removeItem("optibiteAddToCart");
            props.setAddedToCart([]);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.error(err);
        });
    } else {
      alert("Cart Items are empty. Add items to cart prior to purchasing.");
    }
  };

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
          <div>$ 2/-</div>
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
              : buyProduct.rate * quantity + 2}
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
              id="place-order-terms-checkbox-2"
              name="place-order-terms-checkbox"
              value="place-order-terms-checkbox"
              checked
            />
          </div>
          <div>I have read and agree to the optibite terms and conditions</div>
        </div>
        <button className="place-order-button" onClick={Order}>
          <input
            type="submit"
            name="submit-place-order"
            value="submit-place-order"
            className="submit-place-order"
          />
          <div className="mycart-checkout-button">PLACE ORDER </div>
        </button>
      </div>
    </div>
  );
}

export default OrderNow;
