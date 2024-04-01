import React from "react";
import { Link } from "react-router-dom";

function NavLogoMobile(props) {
  function closeHamburgerIcon() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.getElementById("nav").offsetHeight >= window.innerHeight) {
      document.querySelector(".hamburger-icon").click();
    }
  }

  return (
    <Link
      to={props.navHeaderLink}
      className="nav-links nav-links-mobile"
      aria-label="optibite ogo"
      style={
        props.largeScreen ? { display: "none" } : { display: "inline-block" }
      }
      onClick={closeHamburgerIcon}
    >
      <img
        src="../images/logo.png"
        alt="optibite Logo"
        className="nav-header-logo"
      />
    </Link>
  );
}

export default NavLogoMobile;
