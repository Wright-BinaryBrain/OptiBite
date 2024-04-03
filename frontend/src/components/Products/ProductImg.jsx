import React, { useState } from "react";
import { TiArrowShuffle } from "react-icons/ti";
import { TbArrowsMaximize } from "react-icons/tb";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useEffect } from "react";

function ProductImg(props) {
  const [iconHover, setIconHover] = useState({
    shuffle: false,
    maximize: false,
    heart: false,
  });

  function handleHover(iconName) {
    setIconHover((prevItems) => ({ ...prevItems, [iconName]: true }));
  }

  function handleHoverLeave(iconName) {
    setIconHover((prevItems) => ({ ...prevItems, [iconName]: false }));
  }

  return (
    <div className="product-img-container">
      <img className="product-img" src={props.src} alt={props.alt} />
      <div className="product-overlay"></div>
      {props.itemValue.crossedPrice != null ? (
        <div className="discount-percent">
          {((props.itemValue.crossedPrice - props.itemValue.rate) /
            props.itemValue.crossedPrice) *
            100}
          % off
        </div>
      ) : null}

      <div className="product-options">
        <div className="product-icons-container">
          <TiArrowShuffle
            className="product-shuffle-icon"
            onMouseOver={() => handleHover("shuffle")}
            onMouseLeave={() => handleHoverLeave("shuffle")}
          />
          <div
            className="square-arrow"
            style={
              iconHover.shuffle
                ? { opacity: "1", transition: "opacity 0.2s" }
                : { opacity: "0", transition: "opacity 0.2s" }
            }
          ></div>
          <div
            className="icon-info-container"
            style={
              iconHover.shuffle
                ? { opacity: "1", transition: "opacity 0.2s" }
                : { opacity: "0", transition: "opacity 0.2s" }
            }
          >
            Compare
          </div>
        </div>
        <div className="product-icons-container">
          <TbArrowsMaximize
            className="product-maximize-icon"
            onMouseOver={() => handleHover("maximize")}
            onMouseLeave={() => handleHoverLeave("maximize")}
            onClick={() => {
              props.productPopup(props.itemValue);
            }}
          />
          <div
            className="square-arrow"
            style={
              iconHover.maximize
                ? { opacity: "1", transition: "opacity 0.2s" }
                : { opacity: "0", transition: "opacity 0.2s" }
            }
          ></div>
          <div
            className="icon-info-container"
            style={
              iconHover.maximize
                ? { opacity: "1", transition: "opacity 0.2s" }
                : { opacity: "0", transition: "opacity 0.2s" }
            }
          >
            Quick View
          </div>
        </div>
        <div className="product-icons-container">
          <AiOutlineHeart
            id={"addToWishBtn" + String(props.itemValue._id)}
            className="product-heart-icon"
            style={
              props.addToWish
                ? { display: "none" }
                : { display: "inline-block" }
            }
            onClick={() => props.handleAdd(props.itemValue)}
            onMouseOver={() => handleHover("heart")}
            onMouseLeave={() => handleHoverLeave("heart")}
          />
          <AiFillHeart
            id={"removeFromWishBtn" + String(props.itemValue._id)}
            className="product-heart-icon"
            style={
              props.addToWish
                ? { display: "inline-block", color: "#E02118" }
                : { display: "none" }
            }
            onClick={() => props.handleRemove(props.itemValue)}
            onMouseOver={() => handleHover("heart")}
            onMouseLeave={() => handleHoverLeave("heart")}
          />
          <div
            className="square-arrow"
            style={
              iconHover.heart
                ? { opacity: "1", transition: "opacity 0.2s" }
                : { opacity: "0", transition: "opacity 0.2s" }
            }
          ></div>
          <div
            className="icon-info-container"
            style={
              iconHover.heart
                ? { opacity: "1", transition: "opacity 0.2s" }
                : { opacity: "0", transition: "opacity 0.2s" }
            }
          >
            {props.addToWish ? "Remove from Wishlist" : "Add to Wishlist"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductImg;
