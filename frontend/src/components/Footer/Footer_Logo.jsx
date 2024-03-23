import React from "react";
import { Link } from "react-router-dom";

function FooterLogo(props) {
  return (
    <div className="footer-order">
      <img src={props.image} alt="Sabji Land" className="footer-logo " />
      <p className="footer-des">Buy Vegetables fast and easy</p>
      <Link to="/shop">
      <button className="footer-btn">Order From us</button>
      </Link>
    </div>
  );
}

export default FooterLogo;
