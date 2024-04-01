import React ,{useState,useEffect, useRef} from "react";
import CartOrderSummary from "./CartOrderSummary.jsx";
import CartProcess from "../CartProcess/CartProcess.jsx";
import ProductDiv from "../Products/ProductDiv.jsx";
import axios from "axios";
import CartTable from "./CartTable.jsx";
import { Link } from "react-router-dom";

import "../../CSS/cart.css"

function Cart(props) {
  const [ProductList, setProductList] = useState([]);

  function getProduct() {
    axios.get("https://backend.sabjiland.com/api/v1/getProducts", {params: {"rowsPerPage": 4}})
    .then((res)=>setProductList(res.data.data))
    .catch((err)=>console.log(err))
   }
  useEffect(()=>{
    getProduct();
  },[]);


  function handleShopping() {
    window.scrollTo({ top:0, left:0, behavior: "instant"});
  }

  function handleShoppingPress(event) {
    if (event.key === "Enter") {
      window.scrollTo({ top:0, left:0, behavior: "instant"});
    }
  }
  
  function handleRemoveAll() {
    localStorage.removeItem("sabjilandAddToCart");
    props.setAddedToCart([]);
  }

  const [selectedItems, setSelectedItems] = useState([]);
  var tempSelectedItems = useRef([]);
  var deleteIndex = useRef([]);
  var deleteCartItems;

  function handleRemoveSelected() {
    deleteIndex = [];
    deleteCartItems = JSON.parse(localStorage.getItem("sabjilandAddToCart"));
    for (let i = 0; i < selectedItems.length; i++){
      for (let j = 0; i < deleteCartItems.length; j++){
        if (String(selectedItems[i]) === String(deleteCartItems[j]._id)){
          deleteIndex.push(j);
          break;
        }
      }
    }

    deleteIndex = deleteIndex.sort().reverse();

    for (let i = 0; i < deleteIndex.length; i++){
      deleteCartItems.splice(deleteIndex[i], 1);
    }

    localStorage.removeItem("sabjilandAddToCart");
    if (String(deleteCartItems) != String([])) {
      localStorage.setItem("sabjilandAddToCart", JSON.stringify(deleteCartItems));
    }

    if (JSON.parse(localStorage.getItem("sabjilandAddToCart")) === null) {
      props.setAddedToCart([]);
    }
    else {
      props.setAddedToCart(JSON.parse(localStorage.getItem("sabjilandAddToCart")));
    }

    setSelectedItems([]);
    tempSelectedItems.current = [];

    var cart_Checkboxes = document.querySelectorAll(".mycart-checkbox");
      for (let i = 0; i < cart_Checkboxes.length; i++) {
        cart_Checkboxes[i].checked = false;
      }
  }

  
  return (
    <div className="mycart-container">
      <div className="mycart-path">
        Home&nbsp;&gt;&nbsp;<span style={{ color: "#BE4217" }}>Cart</span>
      </div>
      {/* <CartProcess /> */}
      <p className="mycart-title">My Cart</p>
      <div className="mycart-summary-container">
        <div className="mycart-table-width">
          <div className="cart-table-container">
            <CartTable addedToCart={props.addedToCart} setAddedToCart={props.setAddedToCart} selectedItems={selectedItems} setSelectedItems={setSelectedItems} tempSelectedItems={tempSelectedItems}/>
          </div>
          <div className="mycart-buttons">
            <Link to="/Shop" onClick={handleShopping} onKeyPress={handleShoppingPress}>
              <button className="mycart-continue-shopping">
                CONTINUE SHOPPING
              </button>
            </Link>
            <div className="mycart-buttons-container">
              <button
                className="mycart-bottom-cart-button bottom-button-margin" onClick={handleRemoveSelected}
              >
                <input
                  type="submit"
                  name="submit-mycart-selected-cart-btn"
                  value="submit-mycart-selected-cart-btn"
                  className="submit-mycart-bottom-cart"
                />
                <div className="mycart-bottom-cart-btn-text">
                  Delete Selected Item
                </div>
              </button>
              <button className="mycart-bottom-cart-button" onClick={handleRemoveAll}>
                <input
                  type="submit"
                  name="submit-mycart-all-cart-btn"
                  value="submit-mycart-all-cart-btn"
                  className="submit-mycart-bottom-cart"
                />
                <div className="mycart-bottom-cart-btn-text">
                  Remove All
                </div>
              </button>
            </div>
          </div>
        </div>
        <div>
          <CartOrderSummary addedToCart={props.addedToCart} displayGuest={props.displayGuest}/>
        </div>
      </div>
      <div className="mycart-recently-viewed-titles">
        RECENTLY VIEWED PRODUCTS
      </div>
      <div className="product-div-container">
        {
          ProductList.map((itemValue)=>{
          return (
            <ProductDiv 
              itemValue={itemValue} 
              productPopup={props.productPopup} 
              addToCart={props.addToCart} 
              addedToCart={props.addedToCart}
              detectWishlistChange={props.detectWishlistChange}
              setDetectWishlistChange={props.setDetectWishlistChange}
            />
            )
          })     
        }
      </div>
    </div>
  );
}

export default Cart;
