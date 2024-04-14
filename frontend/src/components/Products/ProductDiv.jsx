import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductList from "./ProductList.js";
import ProductImg from "./ProductImg.jsx";
import ProductName from "./ProductName.jsx";
import Price from "./Price.jsx";
import QuantityBtn from "./QuantityBtn.jsx";
import DropdownUnit from "./DropdownUnit.jsx";
import { FiShoppingCart } from "react-icons/fi";
import { useLocation } from "react-router-dom";

function ProductDiv(props) {
  const location = useLocation();

  const [quantity, setQuantity] = useState(1);

  // console.log(props.itemValue);
  return (
    <div
      className="product-div"
      key={"productKey" + String(props.itemValue._id)}
      id={"productId" + String(props.itemValue._id)}
    >
      <ProductImg
        src={`${props.itemValue.image}`}
        alt={props.itemValue.Name}
        productPopup={props.productPopup}
        id={props.itemValue._id}
        itemValue={props.itemValue}
      />
      <ProductName productname={props.itemValue.Name} />

      {/* <form action="" className="product-form" onSubmit=""> */}
      <div className="product-form">
        <div className="product-quantity-container">
          <Price rate={props.itemValue.Rate} />
          <div className="product-quantity">
            <QuantityBtn
              inputid={"quantity-btn" + String(props.itemValue._id)}
              inputname={"quantity-btn" + String(props.itemValue._id)}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>

        <button
          onClick={() => props.addToCart(props.itemValue, quantity)}
          className="cart-button"
        >
          <FiShoppingCart className="submit-cart-icon" />
          <div className="submit-cart-txt">Cart</div>
        </button>
      </div>
      {/* </form> */}
    </div>
    // </div>
  );
}

export default ProductDiv;
