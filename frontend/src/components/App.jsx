import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx";
import HeaderContact from "./HeaderContact/HeaderContact.jsx";
import UpperNav from "./Navbar/UpperNav.jsx";
import ProductDiv from "./Products/ProductDiv.jsx";
// import WishList from "./WishList/WishList.jsx";
// import AboutUs from "./AboutUs/AboutUS";
// import Footer from "./Footer/Footer.jsx";
import Contact from "./contact/contact";
import Home from "./Home/home.jsx";
import Cart from "./Cart/Cart.jsx";
import BillingDetails from "./BillingDetails/BillingDetails.jsx";
import Login from "./login/Login";
import Guest from "./login/Guest";
import DeliveryLocation from "./DeliveryLocation/DeliveryLocation.jsx";
import Payment from "./Payment/Payment.jsx";
import OrderReceived from "./OrderReceived/OrderReceived.jsx";
import MiniCart from "./Navbar/MIniCart.jsx";
import Shop from "./Shop/Shop.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Admin from "./admin-panel/admin.jsx";
// *******************************
import AddressBook from "./UserProfile/UserPageNav/AddressBook";
import Wallet from "./UserProfile/UserPageNav/Wallet";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from "./UserProfile/UserPageNav/Orders";
import EditProfile from "./UserProfile/UserPageNav/EditProfile";
import "./UserProfile/userProfile.css";
// *******************************
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Thankyou from "./Thankyou/Thankyou.jsx";
import ErrorPage from "./404/404.jsx";

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

  function handleGuest(displayPop, quantity) {
    if (isLoggedIn === false) {
      setDisplayGuest((preValue) => !preValue);
    } else {
      handleClick();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      navigate("/billingdetails");
    }

    if (displayPop === "none" && quantity === "none") {
      setIsOrderCart(true);
    } else if (displayPop === "delete" && quantity === "delete") {
      setIsOrderCart(true);
      localStorage.removeItem("optibiteBuyProduct");
      localStorage.removeItem("optibiteQuantity");
    } else {
      // console.log("Order Details=",orderDetails);
      setIsOrderCart(false);
      setBuyProduct(displayPop);
      setBtnQuantity(quantity);

      localStorage.setItem("optibiteBuyProduct", JSON.stringify(displayPop));
      localStorage.setItem("optibiteQuantity", JSON.stringify(quantity));
    }
  }

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

  if (maxPopup === true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  const [addedToCart, setAddedToCart] = useState(
    JSON.parse(localStorage.getItem("optibiteAddToCart")) != null
      ? JSON.parse(localStorage.getItem("optibiteAddToCart"))
      : []
  );
  const [itemQuantity, setItemQuantity] = useState(0.5);
  var addQty;
  var cartItems;

  if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
  }

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
      ) : isGuest ? (
        <Guest close={closeGuest} />
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
          detectWishlistChange={detectWishlistChange}
          setDetectWishlistChange={setDetectWishlistChange}
          // close={closeLoginBox}
        />

        {/* <Navbar
          navVisible={navVisible}
          windowScroll={windowScroll}
          cartPopup={handleCartPopup}
          addedToCart={addedToCart}
          navHeaderLink="/"
          navLink1="/"
          navLink2="/Shop"
          navLink3="/WishList"
          navLink4="/Cart"
          navLink5="/BillingDetails"
          navLink6="/Payment"
          navLink7="/OrderReceived"
          navLink8="/DeliveryLocation"
          navLink9="/AboutUs"
          navLink10="/contact"
        /> */}

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
          navLink5="/contact"
          typedOnSearchbar={searchHandler}
          detectWishlistChange={detectWishlistChange}
          setDetectWishlistChange={setDetectWishlistChange}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
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
                searchItem={searchItem}
                setSearchItem={setSearchItem}
                detectWishlistChange={detectWishlistChange}
                setDetectWishlistChange={setDetectWishlistChange}
                displayFilterSection={false}
                displayShopSection={true}
              />
            }
          />
          {/* <Route
            path="/WishList"
            element={
              <WishList
                productPopup={handleClick}
                addToCart={addToCart}
                addedToCart={addedToCart}
                setAddedToCart={setAddedToCart}
                detectWishlistChange={detectWishlistChange}
                setDetectWishlistChange={setDetectWishlistChange}
              />
            }
          /> */}
          <Route
            path="/Cart"
            element={
              <Cart
                productPopup={handleClick}
                addToCart={addToCart}
                addedToCart={addedToCart}
                setAddedToCart={setAddedToCart}
                displayGuest={handleGuest}
                detectWishlistChange={detectWishlistChange}
                setDetectWishlistChange={setDetectWishlistChange}
              />
            }
          />
          <Route
            path="/BillingDetails"
            element={<BillingDetails isOrderCart={isOrderCart} />}
          />
          <Route
            path="/Payment"
            element={
              <Payment
                setAddedToCart={setAddedToCart}
                isOrderCart={isOrderCart}
                setOrderResponse={setOrderResponse}
                setOrderQuantity={setOrderQuantity}
              />
            }
          />
          {/* <Route
            path="/invoice"
            element={
              <Thankyou
                orderQty={orderQuantity}
                orderResponse={orderResponse}
              />
            }
          /> */}
          {/* <Route path="/OrderReceived" element={<OrderReceived />} /> */}
          {/* <Route path="/DeliveryLocation" element={<DeliveryLocation />} /> */}
          {/* <Route path="/AboutUs" element={<AboutUs />} /> */}
          <Route path="/Admin" element={<Admin />} />

          {/* ******************************************************************** */}
          {/* user profile links */}
          <Route path="/view">
            <Route path="" element={<EditProfile />} />

            <Route path="orders" element={<Orders />} />
            {/* not needed */}
            {/* <Route path="address" element={<AddressBook />} />
            <Route path="wallet" element={<Wallet />} /> */}
          </Route>
          <Route path="/*" element={<ErrorPage />} />
          {/* ******************************************************************** */}
        </Routes>
        {/* <Footer /> */}

        {/* <ProductDiv /> */}
        {/* <ProductPopup /> */}
        {/* <Cart /> */}
        {/* <BillingDetails /> */}

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

        {displayGuest ? (
          <Guest
            setOrderResponse={setOrderResponse}
            setOrderQuantity={setOrderQuantity}
            close={handleGuest}
            handleClick={handleClick}
            isOrderCart={isOrderCart}
            buyProduct={buyProduct}
            btnQuantity={btnQuantity}
            setAddedToCart={setAddedToCart}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
