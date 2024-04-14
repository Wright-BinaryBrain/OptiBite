import React, { useState, useRef } from "react";
import QuantityBtn from "./QuantityBtn.jsx";
import DropdownUnit from "./DropdownUnit.jsx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useEffect } from "react";
import axios from "axios";

function ProductPopup(props) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [props.addedToCart]);

  const [productFamilyName, setProductFamilyName] = useState("");
  const [productTypeName, setProductTypeName] = useState("");
  console.log(props.displayPop);
  console.log(props.productPopup);
  return (
    <div
      className="product-popup-overlay"
      style={
        props.productPopup
          ? {
              background: "rgba(80 79 79 / 43%)",
              backdropFilter: "blur(10px)",
              height: "100vh",
              width: "100%",
            }
          : {
              background: "transparent",
              backdropFilter: "blur(0)",
              width: "0",
              height: "0",
            }
      }
    >
      <div
        // className="product-popup-overlay2"
        // style={
        //   props.productPopup
        //     ? {
        //         height: "100%",
        //         width: "100%",
        //         transition: "height 0.3s, width 0.3s"
        //       }
        //     : { height: "0", width: "0", transition: "height 0.3s, width 0.3s" }
        // }
        className={
          props.productPopup
            ? "product-popup-overlay2 increase-overlay2"
            : "product-popup-overlay2 decrease-overlay2"
        }
      >
        <div className="product-popup">
          <div
            className="popup-image-side"
            style={
              props.productPopup
                ? { opacity: "1", transition: "opacity 0.2s ease 0.5s" }
                : { opacity: "0", transition: "opacity 0.5s ease" }
            }
          >
            <div className="popup-name-container">
              <div className="popup-name">{props.displayPop?.Name}</div>
            </div>
            <div className="popup-image-container">
              <img
                className="popup-image"
                // src="../images/ProductImage/jar-with-fresh-honey 1.png"
                src={props.displayPop?.image}
                alt={props.displayPop?.Name}
              />
            </div>
            {/* <div className="popup-vertical-line"></div> */}
          </div>
          <div
            className="popup-detail-side"
            style={
              props.productPopup
                ? { opacity: "1", transition: "opacity 0.2s ease 0.5s" }
                : { opacity: "0", transition: "opacity 0.5s ease" }
            }
          >
            <div className="popup-price">$. {props.displayPop?.Rate}</div>
            <div className="popup-stock">{props.displayPop?.stock}</div>

            <div className="popup-detail">{props.displayPop?.Describe}</div>

            <div className="product-popup-form">
              <div className="popup-qty-container">
                <QuantityBtn
                  inputid={"quantity-btn-popup" + String(1)}
                  inputname={"quantity-btn-popup" + String(1)}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>
              <div className="popup-buttons-parent-container">
                <button
                  className="popup-cart-button"
                  onClick={() => props.addToCart(props.displayPop, quantity)}
                >
                  <div className="popup-btn-cart-text">Add to Cart</div>
                </button>
              </div>
            </div>
            <div className="popup-horizontal-line"></div>
            <div className="popup-genre-container">
              <div className="popup-category">
                Category:&nbsp;&nbsp;&nbsp;
                <span className="popup-genre-value-color">
                  {props.displayPop?.C_Type}
                </span>
              </div>
              <div className="popup-tags">
                Veg/Non-Veg:&nbsp;&nbsp;&nbsp;
                <span className="popup-genre-value-color">
                  {props.displayPop?.Veg_Non}
                </span>
              </div>
            </div>
          </div>
          <div
            className="close-popup"
            // onClick={props.productPopup}
            onClick={() => {
              props.productPopup();
            }}
            style={
              props.productPopup
                ? { opacity: "1", transition: "opacity 0.2s ease 0.5s" }
                : { opacity: "0", transition: "opacity 0.5s ease" }
            }
          >
            <div className="close-cross1"></div>
            <div className="close-cross2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
