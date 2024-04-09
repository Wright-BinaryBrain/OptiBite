import React, { useEffect, useState, useRef } from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

function NavWish(props) {
  const [wishlistCount, setWishlistCount] = useState(0);
  var productId = useRef([]);



  function closeHamburgerIcon() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.getElementById("nav").offsetHeight >= window.innerHeight) {
      document.querySelector(".hamburger-icon").click();
    }
  }

  return (
    <Link
      to={"/WishList"}
      className="nav-wish"
      style={{ color: "black" }}
      onClick={closeHamburgerIcon}
    >
      <FiHeart className="navwish-icon" />
      <div className="notify-wish">
        <div className="notify-num">{wishlistCount}</div>
      </div>
    </Link>
  );
}

export default NavWish;
