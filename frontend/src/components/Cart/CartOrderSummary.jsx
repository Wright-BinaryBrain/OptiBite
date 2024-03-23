import React, {useState} from "react";
import { useEffect } from "react";

function CartOrderSummary(props) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [cartEmpty,setCartEmpty] = useState();
  const [cartItemsList,setCartItemsList] = useState(0);
  var subTotal = 0;
  var cartList;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("sabjilandAddToCart")) === null) {
      cartList = [];
      setCartEmpty(true);
    }
    else {
      cartList = JSON.parse(localStorage.getItem("sabjilandAddToCart"));
      setCartEmpty(false);
      setCartItemsList (cartList.length);
    }
    
    for (let i = 0; i < cartList.length; i++){
      subTotal = (cartList[i].qtyBtn * cartList[i].rate) + subTotal;
    }
    setTotalAmount(subTotal);
    setGrandTotal(subTotal + 100);
  },[props.addedToCart]);




  // var cartItems;
  // useEffect(()=>{
  //   if (props.isOrderCart === true) {
  //     if (JSON.parse(localStorage.getItem("sabjilandAddToCart")) === null) {
  //       cartItems = [];
  //     } else {
  //       cartItems = JSON.parse(localStorage.getItem("sabjilandAddToCart"));
  //     }
   
  //       if (cartItems.length !== 0 ) {
  //         setCartEmpty(false);
  //         // alert("Order placed successfully!");
  //       } else {
  //         alert("Cart Items are empty. Add items to cart prior to purchasing.");
  //       }
  //     }
  // },[props.addToCart])

 
  







  return (
    <div className="mycart-order-summary">
      <div className="mycart-order-title">ORDER SUMMARY</div>
      <div className="mycart-order-details">
        <div className="mycart-order-flex">
          <div>Sub Total</div>
          <div>Rs {totalAmount}/-</div>
        </div>
        <div style={{ fontSize: "12px" }}>{(cartItemsList+ " Item/s")}</div>
        <div className="mycart-order-flex">
          <div>Delivery Charge</div>
          <div>Rs 100/-</div>
        </div>
      </div>
      <div
        className="mycart-order-total"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mycart-order-flex">
          <div>Total</div>
          <div>Rs {grandTotal}/-</div>
        </div>
        <button className="mycart-checkout-button" onClick={() =>cartEmpty? alert("Cart Items are empty. Add items to cart prior to purchasing.") : props.displayGuest("delete","delete")}>
          {/* <input
            type="submit"
            name="submit-mycart-checkout"
            value="submit-mycart-checkout"
            className="submit-mycart-checkout"
          /> */}
          <div className="mycart-checkout-btn-text">Place Order</div>
        </button>
      </div>
    </div>
  );
}

export default CartOrderSummary;
