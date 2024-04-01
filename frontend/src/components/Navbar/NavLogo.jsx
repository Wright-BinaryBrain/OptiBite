import React from "react";
import { Link } from "react-router-dom";

function NavLogo(props) {
  return (
    <Link
      to={props.navHeaderLink}
      className="nav-links"
      aria-label="optibite Logo"
      style={props.largeScreen ? {} : { top: "7.8px" }}
    >
      <img
        src="../images/logo.png"
        alt="optibite Logo"
        className="nav-header-logo"
      />
    </Link>
  );
}

export default NavLogo;
