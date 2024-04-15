import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx";
import UpperNav from "./Navbar/UpperNav.jsx";

import ProductDiv from "./Products/ProductDiv.jsx";
import Home from "./Home/home.jsx";
import Cart from "./Cart/Cart.jsx";
import Login from "./login/Login";
import MiniCart from "./Navbar/MIniCart.jsx";
import Shop from "./Shop/Shop.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Admin from "./admin-panel/admin.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPopup from "./Products/ProductPopup.jsx";
function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [maxPopup, setMaxPopup] = useState(false);
  const [navVisible, setNavVisible] = useState(0);
  const [windowScroll, setWindowScroll] = useState(0);
  const [prevWinScroll, setPrevWinScroll] = useState(0);
  const [displayPop, setDisplayPop] = useState({ image: [] });
  const [displayGuest, setDisplayGuest] = useState(false);
  const [detectWishlistChange, setDetectWishlistChange] = useState(false);

  window.addEventListener("scroll", function () {
    setNavVisible(window.scrollY);
    setWindowScroll(window.scrollY - prevWinScroll);
    setPrevWinScroll(window.scrollY);
  });

  function handleClick(itemValue) {
    setMaxPopup((preValue) => !preValue);
    if (maxPopup === false) {
      setDisplayPop(itemValue);
    }
  }
  console.log(maxPopup);
  const [isOrderCart, setIsOrderCart] = useState();
  const [buyProduct, setBuyProduct] = useState();
  const [btnQuantity, setBtnQuantity] = useState();
  const [orderResponse, setOrderResponse] = useState({});
  const [orderQuantity, setOrderQuantity] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/whoami", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success === true) {
          setIsLoggedIn(true);
          setUserData(res.data.user);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const openLoginBox = () => {
    setIsLogin(true);
    console.log("login");
  };
  const closeLoginBox = () => {
    setIsLogin(false);
  };
  const openGuest = () => {
    setIsGuest(true);
  };
  const closeGuest = () => {
    setIsGuest(false);
  };

  // if (maxPopup === true) {
  //   document.body.style.overflowY = "hidden";
  // } else {
  //   document.body.style.overflowY = "scroll";
  // }

  const [addedToCart, setAddedToCart] = useState(
    JSON.parse(localStorage.getItem("optibiteAddToCart")) != null
      ? JSON.parse(localStorage.getItem("optibiteAddToCart"))
      : []
  );
  const [itemQuantity, setItemQuantity] = useState(1);
  var addQty;
  var cartItems;

  if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
  }

  useEffect(() => {
    if (isLoggedIn === false) {
      cartItems = [];
    }
  }, [isLoggedIn]);

  function addToCart(itemValue, qty) {
    addQty = false;
    itemValue["qtyBtn"] = qty;
    for (let i = 0; i < cartItems.length; i++) {
      if (String(cartItems[i]._id) === String(itemValue._id)) {
        cartItems[i].qtyBtn = Number(cartItems[i].qtyBtn) + Number(qty);
        addQty = true;
        break;
      }
    }

    if (addQty === false) {
      cartItems.push(itemValue);
    }

    if (cartItems != []) {
      localStorage.setItem("optibiteAddToCart", JSON.stringify(cartItems));
      setAddedToCart(JSON.parse(localStorage.getItem("optibiteAddToCart")));
    }
    toast.success("Added to Cart", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  const [cartPopup, setCartPopup] = useState(false);

  function handleCartPopup() {
    setCartPopup((preValue) => !preValue);
  }

  const [searchItem, setSearchItem] = useState();

  function searchHandler(event) {
    navigate("/Shop");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setSearchItem(event.target.value);
    if (document.getElementById("nav").offsetHeight >= window.innerHeight) {
      document.querySelector(".hamburger-icon").click();
    }
  }

  return (
    <div>
      <ToastContainer style={{ zIndex: "9999999" }} />
      {isLogin ? (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setUserData={setUserData}
          closeLogin={closeLoginBox}
        />
      ) : (
        ""
      )}
      <div className="index-container">
        <UpperNav
          navHeaderLink="/"
          open={openLoginBox}
          userData={userData}
          setUserData={setUserData}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          windowScroll={windowScroll}
          navVisible={navVisible}
          cartPopup={handleCartPopup}
          addedToCart={addedToCart}
          typedOnSearchbar={searchHandler}
          // close={closeLoginBox}
        />

        <Navbar
          open={openLoginBox}
          userData={userData}
          setUserData={setUserData}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          navVisible={navVisible}
          windowScroll={windowScroll}
          cartPopup={handleCartPopup}
          addedToCart={addedToCart}
          navHeaderLink="/"
          navLink1="/"
          navLink2="/Shop"
          navLink3="/Cart"
          navLink4="/Admin"
          typedOnSearchbar={searchHandler}
          detectWishlistChange={detectWishlistChange}
          setDetectWishlistChange={setDetectWishlistChange}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                productPopup={handleClick}
                addToCart={addToCart}
                addedToCart={addedToCart}
                detectWishlistChange={detectWishlistChange}
                setDetectWishlistChange={setDetectWishlistChange}
              />
            }
          />
          <Route
            path="/Shop"
            element={
              <Shop
                addToCart={addToCart}
                addedToCart={addedToCart}
                productPopup={handleClick}
                searchItem={searchItem}
                setSearchItem={setSearchItem}
                detectWishlistChange={detectWishlistChange}
                setDetectWishlistChange={setDetectWishlistChange}
                displayFilterSection={false}
                displayShopSection={true}
              />
            }
          />

          <Route
            path="/Cart"
            element={
              <Cart
                productPopup={handleClick}
                addToCart={addToCart}
                addedToCart={addedToCart}
                setAddedToCart={setAddedToCart}
                detectWishlistChange={detectWishlistChange}
                setDetectWishlistChange={setDetectWishlistChange}
              />
            }
          />

          <Route path="/Admin" element={<Admin />} />
        </Routes>
        {maxPopup ? (
          <ProductPopup
            isLoggedIn={isLoggedIn}
            productPopup={handleClick}
            displayPop={displayPop}
            addToCart={addToCart}
            addedToCart={addedToCart}
          />
        ) : (
          <ProductPopup productPopup={false} displayPop={displayPop} />
        )}

        {cartPopup ? (
          <MiniCart
            cartPopup={handleCartPopup}
            addedToCart={addedToCart}
            setAddedToCart={setAddedToCart}
          />
        ) : (
          <MiniCart
            cartPopup={false}
            addedToCart={addedToCart}
            setAddedToCart={setAddedToCart}
          />
        )}
      </div>
    </div>
  );
}

export default App;
