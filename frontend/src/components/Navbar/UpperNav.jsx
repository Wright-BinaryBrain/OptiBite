import React, { useState } from "react";
import NavLogo from "./NavLogo.jsx";
import NavSearch from "./NavSearch.jsx";
import NavCart from "./NavCart.jsx";
import NavLoginBtn from "./NavLoginBtn.jsx";

import "../login/login.css";
import Login from "../login/Login";

import ProfileAvatar from "./ProfileAvatar";
import "../../CSS/uppernav.css";

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
    <div className="uppernav">
      <div className="uppernav-container">
        <NavLogo
          navHeaderLink={props.navHeaderLink}
          largeScreen={props.largeScreen}
        />
        <NavSearch typedOnSearchbar={props.typedOnSearchbar} />
        <div className="navicons-container">
          <NavCart
            cartPopup={props.cartPopup}
            addedToCart={props.addedToCart}
          />

          {props.isLoggedIn ? (
            <ProfileAvatar
              setIsLoggedIn={props.setIsLoggedIn}
              setUserData={props.setUserData}
              userData={props.userData}
            />
          ) : (
            <NavLoginBtn open={props.open} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UpperNav;
