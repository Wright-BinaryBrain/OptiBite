import React, { useState } from "react";
import NavLogo from "./NavLogo.jsx";
import NavSearch from "./NavSearch.jsx";
import NavWish from "./NavWish.jsx";
import NavCart from "./NavCart.jsx";
import NavLoginBtn from "./NavLoginBtn.jsx";

import "../login/login.css";
import Login from "../login/Login";
import PopupBox from "../login/PopupBox";
import Guest from "../login/Guest";

import ProfileAvatar from "./ProfileAvatar"
import "../../PrashantCSS/uppernav.css"

function UpperNav(props) {
  // const [isLogin, setIsLogin] = useState(false);
  // const [isGuest, setIsGuest] = useState(false);
  // const openLoginBox = (event) => {
  //   event.preventDefault();
  //   setIsLogin(true);
  // };
  // const closeLoginBox = () => {
  //   setIsLogin(false);
  // };
  // const openGuest = () => {
  //   setIsGuest(true);
  // };
  // const closeGuest = () => {
  //   setIsGuest(false);
  // };

  return (
    <div
      className="uppernav"
      style={
        props.navVisible === 0 || props.windowScroll < 0
          ? props.navVisible === 0
            ? { top: "40px" }
            : { top: "0px" }
          : { top: "-200px" }
      }
    >
      <div className="uppernav-container">
        <NavLogo
          navHeaderLink={props.navHeaderLink}
          largeScreen={props.largeScreen}
        />
        <NavSearch typedOnSearchbar={props.typedOnSearchbar}/>
        <div className="navicons-container">
          <NavWish typedOnSearchbar={props.typedOnSearchbar} detectWishlistChange={props.detectWishlistChange}
          setDetectWishlistChange={props.setDetectWishlistChange}/>
          <NavCart cartPopup={props.cartPopup} addedToCart={props.addedToCart}/>

{
  
  props.isLoggedIn? <ProfileAvatar setIsLoggedIn={props.setIsLoggedIn} setUserData={props.setUserData} userData={props.userData}/> : <NavLoginBtn open={props.open} />
}

          
          {/* <NavLoginBtn open={openLoginBox} guest={openGuest} /> */}
          {/* {isLogin ? (
            <Login closeLogin={closeLoginBox} />
          ) : isGuest ? (
            <Guest close={closeGuest} />
          ) : (
            <NavLoginBtn open={openLoginBox} guest={openGuest} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default UpperNav;
