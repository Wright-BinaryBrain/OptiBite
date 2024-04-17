import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

function NavCart(props) {
  var cartItems;

  if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
  }

  var counter = 0;
  for (let i = 0; i < cartItems.length; i++) {
    counter = counter + 1;
  }

  const [cartCounter, setCartCounter] = useState(counter);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("optibiteAddToCart")) === null) {
      cartItems = [];
    } else {
      cartItems = JSON.parse(localStorage.getItem("optibiteAddToCart"));
    }

    var counter = 0;
    for (let i = 0; i < cartItems.length; i++) {
      counter = counter + 1;
    }

    setCartCounter(counter);
  }, [props.addedToCart]);

  function closeHamburgerIcon() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.getElementById("nav").offsetHeight >= window.innerHeight) {
      document.querySelector(".hamburger-icon").click();
    }
  }

  return (
    <Link
      to={"/Cart"}
      className="nav-cart"
      style={{ color: "black" }}
      onClick={closeHamburgerIcon}
    >
      <FiShoppingCart className="navcart-icon" />
      <div className="notify-cart">
        <div className="notify-num">{cartCounter}</div>
      </div>
    </Link>
  );
}

export default NavCart;
