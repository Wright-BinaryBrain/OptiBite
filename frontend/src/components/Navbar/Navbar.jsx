import React, { useState, useEffect } from "react";
import HamburgerIcon from "./HamburgerIcon.jsx";
import NavItemList from "./NavItemList.jsx";

import NavIconsContain from "./NavIconsContain.jsx";
import NavLogoMobile from "./NavLogoMobile.jsx";
import { BiUserCircle } from "react-icons/bi";
import ProfileAvatar from "./ProfileAvatar.jsx";

import "../../CSS/navbar.css";

import "../../CSS/minicart.css";
import axios from "axios";
function Navbar(props) {
  const [navItems, setNavItems] = useState([]);
  console.log(props.userData);
  useEffect(() => {
    if (props.userData) {
      if (props.userData.role == "admin") {
        setNavItems(["Home", "Shop", "Cart", "Admin"]);
      } else {
        setNavItems(["Home", "Shop", "Cart"]);
      }
    } else {
      setNavItems(["Home", "Shop", "Cart"]);
    }
  }, [props.userData]);

  const navLinks = [
    props.navLink1,
    props.navLink2,
    props.navLink3,
    props.navLink4,
  ];

  var currentWidth = window.innerWidth;
  const [largeScreen, setLargeScreen] = useState(
    currentWidth > 800 ? true : false
  );

  function resizeHandler() {
    currentWidth = window.innerWidth;
    if (currentWidth > 800) {
      setLargeScreen(true);
    } else {
      setLargeScreen(false);
    }
  }

  window.addEventListener("resize", resizeHandler);

  const [navbarHeight, setNavbarHeight] = useState({});
  const [listPosition, setListPosition] = useState({});

  const [tabIndexing, setTabIndexing] = useState("-1");

  function handleNavHeight(booleanValue) {
    if (booleanValue === true) {
      setNavbarHeight({
        height: "100vh",
        overflowY: "scroll",
        transition: "height 1s",
      });
      setListPosition({
        top: "150px",
        transitionDelay: "0s",
      });
      setTabIndexing("0");
    } else {
      setNavbarHeight({});
      document.querySelector("#nav").scrollTo(0, 0);
      setListPosition({});
      setTabIndexing("-1");
    }
  }

  return (
    <nav
      aria-label="Navigation bar"
      style={largeScreen ? {} : navbarHeight}
      id="nav"
    >
      <div className="nav-item-container">
        {largeScreen ? null : props.isLoggedIn ? (
          <div
            className="nav-login-mobile"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProfileAvatar
              setIsLoggedIn={props.setIsLoggedIn}
              setUserData={props.setUserData}
              userData={props.userData}
            />
          </div>
        ) : (
          <BiUserCircle className="nav-login-mobile" onClick={props.open} />
        )}
        {/* <NavHeader
          navHeaderLink={props.navHeaderLink}
          largeScreen={largeScreen}
        /> */}
        <NavLogoMobile
          navHeaderLink={props.navHeaderLink}
          largeScreen={largeScreen}
        />
        <NavIconsContain
          detectWishlistChange={props.detectWishlistChange}
          setDetectWishlistChange={props.setDetectWishlistChange}
          largeScreen={largeScreen}
          cartPopup={props.cartPopup}
          addedToCart={props.addedToCart}
        />

        <HamburgerIcon navHeight={handleNavHeight} />
        <NavItemList
          navItems={navItems}
          navLinks={navLinks}
          listPosition={listPosition}
          tabIndexing={tabIndexing}
          largeScreen={largeScreen}
        />
      </div>
    </nav>
  );
}

export default Navbar;
