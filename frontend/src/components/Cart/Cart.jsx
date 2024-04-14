// import React, { useState, useEffect, useRef } from "react";
// import CartOrderSummary from "./CartOrderSummary.jsx";
// import CartProcess from "../CartProcess/CartProcess.jsx";
// import ProductDiv from "../Products/ProductDiv.jsx";
// import axios from "axios";
// import CartTable from "./CartTable.jsx";
// import { Link } from "react-router-dom";

// import "../../CSS/cart.css";

// function Cart(props) {
//   function handleShopping() {
//     window.scrollTo({ top: 0, left: 0, behavior: "instant" });
//   }

//   function handleShoppingPress(event) {
//     if (event.key === "Enter") {
//       window.scrollTo({ top: 0, left: 0, behavior: "instant" });
//     }
//   }

//   function handleRemoveAll() {
//     localStorage.removeItem("optibiteAddToCart");
//     props.setAddedToCart([]);
//   }

//   const [selectedItems, setSelectedItems] = useState([]);
//   var tempSelectedItems = useRef([]);
//   var deleteIndex = useRef([]);
//   var deleteCartItems;

//   function handleRemoveSelected() {
//     deleteIndex = [];
//     deleteCartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
//     for (let i = 0; i < selectedItems.length; i++) {
//       for (let j = 0; i < deleteCartItems.length; j++) {
//         if (String(selectedItems[i]) === String(deleteCartItems[j]._id)) {
//           deleteIndex.push(j);
//           break;
//         }
//       }
//     }

//     deleteIndex = deleteIndex.sort().reverse();

//     for (let i = 0; i < deleteIndex.length; i++) {
//       deleteCartItems.splice(deleteIndex[i], 1);
//     }

//     localStorage.removeItem("optibiteAddToCart");
//     if (String(deleteCartItems) != String([])) {
//       localStorage.setItem(
//         "optibiteAddToCart",
//         JSON.stringify(deleteCartItems)
//       );
//     }

//     if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
//       props.setAddedToCart([]);
//     } else {
//       props.setAddedToCart(
//         JSON.parse(localStorage.getItem("optibiteAddToCart"))
//       );
//     }

//     setSelectedItems([]);
//     tempSelectedItems.current = [];

//     var cart_Checkboxes = document.querySelectorAll(".mycart-checkbox");
//     for (let i = 0; i < cart_Checkboxes.length; i++) {
//       cart_Checkboxes[i].checked = false;
//     }
//   }

//   return (
//     <div className="mycart-container">
//       <div className="mycart-path">
//         Home&nbsp;&gt;&nbsp;<span style={{ color: "#BE4217" }}>Cart</span>
//       </div>
//       {/* <CartProcess /> */}
//       <p className="mycart-title">My Cart</p>
//       <div className="mycart-summary-container">
//         <div className="mycart-table-width">
//           <div className="cart-table-container">
//             <CartTable
//               addedToCart={props.addedToCart}
//               setAddedToCart={props.setAddedToCart}
//               selectedItems={selectedItems}
//               setSelectedItems={setSelectedItems}
//               tempSelectedItems={tempSelectedItems}
//             />
//           </div>
//           <div className="mycart-buttons">
//             <Link
//               to="/Shop"
//               onClick={handleShopping}
//               onKeyPress={handleShoppingPress}
//             >
//               <button className="mycart-continue-shopping">
//                 CONTINUE SHOPPING
//               </button>
//             </Link>
//             <div className="mycart-buttons-container">
//               <button
//                 className="mycart-bottom-cart-button bottom-button-margin"
//                 onClick={handleRemoveSelected}
//               >
//                 <input
//                   type="submit"
//                   name="submit-mycart-selected-cart-btn"
//                   value="submit-mycart-selected-cart-btn"
//                   className="submit-mycart-bottom-cart"
//                 />
//                 <div className="mycart-bottom-cart-btn-text">
//                   Delete Selected Item
//                 </div>
//               </button>
//               <button
//                 className="mycart-bottom-cart-button"
//                 onClick={handleRemoveAll}
//               >
//                 <input
//                   type="submit"
//                   name="submit-mycart-all-cart-btn"
//                   value="submit-mycart-all-cart-btn"
//                   className="submit-mycart-bottom-cart"
//                 />
//                 <div className="mycart-bottom-cart-btn-text">Remove All</div>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div>
//           <CartOrderSummary
//             addedToCart={props.addedToCart}
//             displayGuest={props.displayGuest}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CartOrderSummary from "./CartOrderSummary.jsx";
import CartTable from "./CartTable.jsx";
import { Link } from "react-router-dom";
import "../../CSS/cart.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
function Cart(props) {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const tempSelectedItems = useRef([]);
  const [userDetail, setUserDetail] = useState();
  const [orderAddress, setOrderAddress] = useState("");
  // States for managing totals
  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartItemsList, setCartItemsList] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [schedule, setSchedule] = useState(true);

  const [selectDay, setSelectDat] = useState("");

  const day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
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

  console.log(userDetail);
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

  const handleShopping = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleShoppingPress = (event) => {
    if (event.key === "Enter") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const Order = (event) => {
    if (!loggedin) {
      toast.error("Please login", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    event.preventDefault();
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

    if (cartId.length !== 0 && cartQty.length !== 0) {
      const formData = new FormData();
      formData.append("userId", String(userDetail._id));
      cartId.forEach((value) => formData.append("productId", value));
      cartQty.forEach((value) => formData.append("quantity", value));
      rates.forEach((value) => formData.append("rates", value));
      formData.append("orderAddress", String(orderAddress));

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
    } else {
      alert("Cart is empty");
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
            ""
          ) : (
            <button className="mycart-checkout-button" onClick={Order}>
              PLACE ORDER
            </button>
          )}

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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
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
                <div></div>
              </div>
            </>
          ) : (
            ""
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
