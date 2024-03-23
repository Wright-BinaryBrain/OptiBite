import React, { useState, useRef } from "react";
import QuantityBtn from "../Products/QuantityBtn.jsx";
import DropdownUnit from "../Products/DropdownUnit.jsx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import PopupList from "./PopupList.js";
import { useEffect } from "react";
import axios from "axios";

function ProductPopup(props) {
  
  const [addToWish, setAddToWish] = useState(false);

  var productId = useRef([])

  useEffect(() => {
    axios.get("https://backend.sabjiland.com/api/v1/getMyFavourite",{withCredentials: true})
    .then((res)=> {
      productId.current = res.data.data.productId;
      setAddToWish(productId.current.includes(String(props.displayPop._id)));
    })
    .catch((err)=>console.log(err))
  },[props.productPopup]);
 
  var addToWishBtn = useRef(null);
  var removeFromWishBtn = useRef(null);

  function handleClick(event) {
    event.preventDefault();
    addToWishBtn.current = document.getElementById("addToWishBtn" + String(props.displayPop._id));
    removeFromWishBtn.current = document.getElementById("removeFromWishBtn" + String(props.displayPop._id));

    if (addToWishBtn.current && removeFromWishBtn.current) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      if (addToWish) {
        removeFromWishBtn.current.dispatchEvent(event);
      } else {
        addToWishBtn.current.dispatchEvent(event);
      }
      setAddToWish((prevValue) => !prevValue);
    }
  }

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  },[props.addedToCart]);

  const [productFamilyName, setProductFamilyName] = useState("");
  const [productTypeName, setProductTypeName] = useState("");

  function getProduct() {
    axios.get("https://backend.sabjiland.com/api/v1/getProductFamily/"+String(props.displayPop.productFamilyId))
    .then((res)=>setProductFamilyName(res.data.data.productFamilyName))
    .catch((err)=>console.log(err))

    axios.get("https://backend.sabjiland.com/api/v1/getProductType/"+String(props.displayPop.productTypeId))
    .then((res)=>setProductTypeName(res.data.data.productTypeName))
    .catch((err)=>console.log(err))
   }
  useEffect(()=>{
    getProduct();
  },[props.productPopup]);


  
  return (
    <div
      className="product-popup-overlay"
      style={
        props.productPopup
          ? {
              background: "rgba(80 79 79 / 43%)",
              backdropFilter: "blur(10px)",
              height: "100vh",
              width: "100%"
            }
          : {
              background: "transparent",
              backdropFilter: "blur(0)",
              width: "0",
              height: "0",
              transition:
                "height 0s linear 0.8s, width 0s linear 0.8s, background 0.8s ease 0s, backdrop-filter 0.6s ease 0s"
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
              <div className="popup-name">{props.displayPop.productName} | {props.displayPop.nepaliName}</div>
            </div>
            <div className="popup-image-container">
              <img
                className="popup-image"
                // src="../images/ProductImage/jar-with-fresh-honey 1.png"
                src={`https://backend.sabjiland.com/uploads/${props.displayPop.image[0]}`}
                alt={props.displayPop.productName}
              />
                {props.displayPop.crossedPrice != null ? <div className="discount-percent">{((props.displayPop.crossedPrice - props.displayPop.rate)/props.displayPop.crossedPrice)*100}% off</div> : null}
                {props.displayPop.organic === "Yes" ? <div className="small-description" style={props.displayPop.crossedPrice == null ? {transform: "translateY(0)"} : {transform: "translateY(120%)"}}>Organic</div> : null}
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
            <div className="popup-price">
              Rs. {props.displayPop.rate} <span style={{ fontSize: "16px" }}>per {props.displayPop.unitType}.</span>
            </div>
            <div className="popup-stock">{props.displayPop.stock}</div>
            {props.displayPop.crossedPrice != null ? <div className="popup-crossed-price">Rs. {props.displayPop.crossedPrice} per {props.displayPop.unitType}.</div> : null}
            <div className="popup-detail">
              {props.displayPop.productDescription}
              {/* Organic Honey is our pride possession. Raw honey has about 22
              amino acids in it, 31 different minerals, and a wide range of
              vitamins and enzymes that your body needs to function at its best. */}
            </div>
            <div className="popup-qty-container"></div>
            <div className="popup-buttons"></div>
            <div className="product-popup-form">
              <div className="popup-qty-container">
                <QuantityBtn
                  inputid={"quantity-btn-popup" + String(1)}
                  inputname={"quantity-btn-popup" + String(1)}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <DropdownUnit
                  defaultunit={props.displayPop.unitType}
                  secondUnitType={props.displayPop.secondUnitType}
                  unitid={"productUnit-popup" + String(1)}
                  unitname={"productUnit-popup" + String(1)}
                />
              </div>
              <div className="popup-buttons-parent-container">
                <div className="popup-buttons-child-container">
                  <button className="popup-buy-button" onClick={() => props.displayGuest(props.displayPop, quantity)}>
                    {/* <input
                      type="submit"
                      name="popup-buy"
                      value="popup-buy"
                      className="submit-popup"
                    /> */}
                    <div className="popup-btn-buy-text">Buy now</div>
                  </button>
                  <button className="popup-cart-button" onClick={() => props.addToCart(props.displayPop, quantity)}>
                    {/* <input
                      type="submit"
                      name="popup-addToCart"
                      value="popup-addToCart"
                      className="submit-popup"
                    /> */}
                    <div className="popup-btn-cart-text">Add to Cart</div>
                  </button>
                </div>
                <button className="popup-wishlist-button">
                  <input
                    type="submit"
                    name="popup-wishlist"
                    value="popup-wishlist"
                    className="submit-popup"
                    id={"popup-wishlist-btn" + String(props.displayPop._id)}
                    onClick={handleClick}
                    // onClick={addToWish ? document.getElementById("removeFromWishBtn" + String(props.displayPop._id)).click() : document.getElementById("removeFromWishBtn" + String(props.displayPop._id)).click()}
                  />
                  <div className="popup-btn-wishlist-text">
                    <AiOutlineHeart
                      style={
                        addToWish
                          ? { display: "none" }
                          : { display: "inline-block" }
                      }
                    />
                    <AiFillHeart
                      style={
                        addToWish
                          ? { display: "inline-block", color: "#E02118" }
                          : { display: "none" }
                      }
                    />
                    Add to wishlist
                  </div>
                </button>
              </div>
            </div>
            <div className="popup-horizontal-line"></div>
            <div className="popup-genre-container">
              <div className="popup-category">
                Category:&nbsp;&nbsp;&nbsp;
                <span className="popup-genre-value-color">{productFamilyName}</span>
              </div>
              <div className="popup-tags">
                Tags:&nbsp;&nbsp;&nbsp;
                <span className="popup-genre-value-color">
                  {productTypeName}{props.displayPop.edibleType === "Yes" ? ", Edible" : ", Non-Edible"}{props.displayPop.edibleType === "Yes" ? props.displayPop.vegNonVeg === "Veg" ? ", Veg" : ", Non-Veg" : null}{props.displayPop.organic === "Yes" ? ", Organic" : null}
                </span>
              </div>
            </div>
          </div>
          <div
            className="close-popup"
            // onClick={props.productPopup}
            onClick={()=>{props.productPopup()}}
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
