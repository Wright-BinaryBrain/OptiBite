import React, { useState } from "react";
import { TbArrowsMaximize } from "react-icons/tb";

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

      <div className="product-options">
        <div className="product-icons-container">
          <TbArrowsMaximize
            className="product-maximize-icon"
            onMouseOver={() => handleHover("maximize")}
            onMouseLeave={() => handleHoverLeave("maximize")}
            onClick={() => {
              props.productPopup(props.itemValue);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductImg;
