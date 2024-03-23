import React, { useEffect,useState, useRef } from "react";
import axios from "axios";
import ProductList from "./ProductList.js";
import ProductImg from "./ProductImg.jsx";
import ProductName from "./ProductName.jsx";
import PriceAndStock from "./PriceAndStock.jsx";
import QuantityBtn from "./QuantityBtn.jsx";
import DropdownUnit from "./DropdownUnit.jsx";
import { FiShoppingCart } from "react-icons/fi";
import { useLocation } from 'react-router-dom';

function ProductDiv(props) {
  const location = useLocation();
  const { hash, pathname, search } = location;

  const [quantity, setQuantity] = useState(1);

  const [addToWish, setAddToWish] = useState(false);
  var productId = useRef([]);
  var duplicateItem = useRef(false);

  function checkWishlist(itemValue) {
    axios.get("https://backend.sabjiland.com/api/v1/getMyFavourite",{withCredentials: true})
    .then((res)=> {
      productId.current = res.data.data.productId;
      setAddToWish(productId.current.includes(String(itemValue._id)));
    })
    .catch((err)=>console.log(err))
  }

  function addWishHandler(itemValue) {
    duplicateItem.current = false;
    axios.get("https://backend.sabjiland.com/api/v1/getMyFavourite",{withCredentials: true})
    .then((res)=> {
      productId.current = res.data.data.productId;
      for (let i = 0; i < productId.current.length; i++) {
        if (productId.current[i] === String(itemValue._id)) {
          duplicateItem.current = true;
        }
      }
      if (duplicateItem.current === false) {
        productId.current.push(String(itemValue._id));
        axios.patch("https://backend.sabjiland.com/api/v1/updateFavourite",{"productId": productId.current},{withCredentials: true})
        .then((res) => {
          // console.log(productId.current); 
          setAddToWish(true);
          props.setDetectWishlistChange((prevValue) => !prevValue);
          if (String(pathname) === "/WishList"){
            props.updateWishlist(productId.current)
          }
        })
        .catch((err)=>console.log(err))
      }
      else {
        setAddToWish(true);
        duplicateItem.current = false;
      }
    })
    .catch((err)=> {
      if(err.response.data.message === "You are not logged in") {
        alert("Please login to add items in favorites.");
      }
      else if(err.response.data.message === "Favourite not found") {
        axios.post("https://backend.sabjiland.com/api/v1/postFavourite",{"productId": [String(itemValue._id)]},{withCredentials: true})
        .then((res) => {
          console.log(productId, "POST request");
          setAddToWish(true);
          props.setDetectWishlistChange((prevValue) => !prevValue);
          if (String(pathname) === "/WishList"){
            props.updateWishlist([String(itemValue._id)])
          }
        })
        .catch((err)=>console.log(err))
      }
    })
  }

  function removeWishHandler(itemValue) {
    axios.get("https://backend.sabjiland.com/api/v1/getMyFavourite",{withCredentials: true})
    .then((res)=> {
      productId.current = res.data.data.productId;
      for (let i = 0; i < productId.current.length; i++) {
        if (productId.current[i] === String(itemValue._id)) {
          productId.current.splice(i, 1);
          break;
        }
      }
      // productId.current=[];
      axios.patch("https://backend.sabjiland.com/api/v1/updateFavourite",{"productId": productId.current},{withCredentials: true})
      .then((res) => {
        // console.log(productId.current); 
        setAddToWish(false);
        props.setDetectWishlistChange((prevValue) => !prevValue);
        if (String(pathname) === "/WishList"){
          props.updateWishlist(productId.current)
        }
      })
      .catch((err)=>console.log(err))
    })
    .catch((err)=> console.log(err))
  }

  // useEffect(() => {
  //   setQuantity(1);
  // },[props.addedToCart]);
  
  // var cartBtnAnimation = document.querySelector(".cart-button");

  // useEffect(()=>{
  //   // document.querySelector(".cart-button").addEventListener("Click", function(){
  //       document.querySelector(".submit-cart-txt").classList.add("submit-cart-txt-animation");
  //     // });
  // },[props.addedToCart]);
 
  return (
      <div
        className="product-div"
        key={"productKey" + String(props.itemValue._id)}
        id={"productId" + String(props.itemValue._id)}
        onMouseEnter={() => checkWishlist(props.itemValue)}
        // onTouchStart={() => checkWishlist(props.itemValue)}
      >
        <ProductImg
          src={`https://backend.sabjiland.com/uploads/${props.itemValue.image[0]}`}
          alt={props.itemValue.productName}
          productPopup={props.productPopup}
          id = {props.itemValue._id}
          itemValue = {props.itemValue}
          addToWish={addToWish}
          setAddToWish={setAddToWish}
          handleAdd={addWishHandler}
          handleRemove={removeWishHandler}
        />
        <ProductName productname={props.itemValue.productName} />
        <PriceAndStock
          crossedrate={props.itemValue.crossedPrice}
          rate={props.itemValue.rate}
          stock={props.itemValue.stock}
        />
        {/* <form action="" className="product-form" onSubmit=""> */}
        <div className="product-form">
          <div className="product-quantity">
            <QuantityBtn
              inputid={"quantity-btn" + String(props.itemValue._id)}
              inputname={"quantity-btn" + String(props.itemValue._id)}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <DropdownUnit
              defaultunit={props.itemValue.unitType}
              secondUnitType={props.itemValue.secondUnitType}
              unitid={"productUnit" + String(props.itemValue._id)}
              unitname={"productUnit" + String(props.itemValue._id)}
            />
          </div>
          <button onClick={() => props.addToCart(props.itemValue, quantity)} className="cart-button">
            {/* <input type="submit" value="submit" className="submit-cart" /> */}
            {/* <input className="submit-cart" /> */}
            <div className="submit-cart-txt">Cart</div>
            <FiShoppingCart className="submit-cart-icon" />
          </button>
        </div>
        {/* </form> */}
      </div>
    // </div>
  );
}

export default ProductDiv;
