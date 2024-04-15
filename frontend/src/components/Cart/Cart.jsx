import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CartOrderSummary from "./CartOrderSummary.jsx";
import CartTable from "./CartTable.jsx";
import "../../CSS/cart.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Cart(props) {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const tempSelectedItems = useRef([]);
  const [userDetail, setUserDetail] = useState();
  const [orderAddress, setOrderAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartItemsList, setCartItemsList] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [schedule, setSchedule] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setUserDetail(res.data.user);
          setLoggedin(true);
        }
      })
      .catch((err) => console.log(err));

    let cartList = JSON.parse(localStorage.getItem("optibiteAddToCart")) || [];
    setCartItemsList(cartList.length);
    let subTotal = cartList.reduce(
      (acc, item) => acc + item.qtyBtn * item.Rate,
      0
    );
    setTotalAmount(subTotal);
    setGrandTotal(subTotal + 2);
  }, []);

  const handleRemoveSelected = () => {
    let cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart")) || [];
    const remainingItems = cartItems.filter(
      (item) => !selectedItems.includes(String(item._id))
    );
    localStorage.setItem("optibiteAddToCart", JSON.stringify(remainingItems));
    props.setAddedToCart(remainingItems);
    setSelectedItems([]);
    tempSelectedItems.current = [];
  };

  const handleRemoveAll = () => {
    localStorage.removeItem("optibiteAddToCart");
    props.setAddedToCart([]);
  };

  const Order = (event) => {
    event.preventDefault();
    if (!loggedin) {
      toast.error("Please login", { position: toast.POSITION.TOP_RIGHT });
      return;
    }
    if (!orderAddress.trim()) {
      toast.error("Please enter a delivery address.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart")) || [];
    let cartId = cartItems.map((item) => String(item._id));
    let cartQty = cartItems.map((item) => String(item.qtyBtn));
    let rates = cartItems.map((item) => String(item.Rate));

    if (cartId.length === 0 || cartQty.length === 0) {
      alert("Cart is empty");
      return;
    }

    const formData = new FormData();
    formData.append("userId", String(userDetail._id));
    cartId.forEach((value) => formData.append("productId", value));
    cartQty.forEach((value) => formData.append("quantity", value));
    rates.forEach((value) => formData.append("rates", value));
    formData.append("orderAddress", String(orderAddress));

    if (schedule) {
      formData.append("startDate", startDate.toISOString().substring(0, 10)); // Format date to YYYY-MM-DD
      formData.append("endDate", endDate);
      formData.append("orderTime", orderTime);

      axios
        .post("http://localhost:4000/api/v1/scheduleOrder", formData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Scheduled Order Placed", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/");
            localStorage.removeItem("optibiteAddToCart");
            props.setAddedToCart([]);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      axios
        .post("http://localhost:4000/api/v1/postOrder", formData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Order Placed", {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/");
            localStorage.removeItem("optibiteAddToCart");
            props.setAddedToCart([]);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  return (
    <div className="mycart-container">
      <ToastContainer />
      <p className="mycart-title">My Cart</p>
      <div className="mycart-summary-container">
        <div className="mycart-table-width">
          <CartTable
            addedToCart={props.addedToCart}
            setAddedToCart={props.setAddedToCart}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
          <div className="mycart-buttons">
            <button
              className="mycart-bottom-cart-button"
              onClick={handleRemoveSelected}
            >
              Delete Selected Items
            </button>
            <button
              className="mycart-bottom-cart-button"
              onClick={handleRemoveAll}
            >
              Remove All
            </button>
          </div>
        </div>
        <div>
          <div className="orderAddress-container">
            <label htmlFor="orderAddress">
              <LocationOnIcon />
            </label>
            <input
              type="text"
              id="orderAddress"
              name="orderAddress"
              value={orderAddress}
              className="orderAddress-input"
              onChange={(e) => setOrderAddress(e.target.value)}
              placeholder="Enter your delivery address"
              required
            />
          </div>
          <CartOrderSummary addedToCart={props.addedToCart} />
          {schedule ? (
            <>
              <div className="schedule-order">
                <button
                  className="schedule-close"
                  onClick={() => {
                    setSchedule(false);
                  }}
                >
                  X
                </button>
                <div className="date-container">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate.toISOString().substring(0, 10)}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    className="schedule-iinput"
                  />
                </div>
                <div className="date-container">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="schedule-iinput"
                  />
                </div>
                <div className="time-container">
                  <label htmlFor="orderTime">Time:</label>
                  <input
                    type="time"
                    id="orderTime"
                    value={orderTime}
                    onChange={(e) => setOrderTime(e.target.value)}
                    className="schedule-iinput"
                  />
                </div>
              </div>
            </>
          ) : (
            <button className="mycart-checkout-button" onClick={Order}>
              PLACE ORDER
            </button>
          )}
          {!schedule ? (
            <button
              className="mycart-checkout-button"
              onClick={() => {
                setSchedule(true);
              }}
              style={{ background: "#2784D1", border: "#2784D1" }}
            >
              SCHEDULE ORDER
            </button>
          ) : (
            <button className="mycart-checkout-button" onClick={Order}>
              PLACE ORDER
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
