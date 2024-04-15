import React from "react";

function Price(props) {
  return (
    <div className="product-amt">
      <div>
        <p className="product-price">
          $<span> {props.rate}/-</span>
          <span>&nbsp;&nbsp;</span>
        </p>
      </div>
    </div>
  );
}

export default Price;
