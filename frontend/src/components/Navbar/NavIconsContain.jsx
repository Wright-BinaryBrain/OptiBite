import React from "react";
import NavWish from "./NavWish.jsx";
import NavCart from "./NavCart.jsx";

function NavIconsContain(props) {
  return (
    <div
      className="navicons-container navicons-container-mobile"
      style={props.largeScreen ? { display: "none" } : { display: "flex" }}
    >
      <NavCart cartPopup={props.cartPopup} addedToCart={props.addedToCart} />
    </div>
  );
}

export default NavIconsContain;
