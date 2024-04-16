import React from "react";
import CartTable from "../Cart/CartTable.jsx";
import '../../CSS/minicart.css'
function MiniCart(props) {
    return  (
        <div
            className="mini-cart-overlay"
            style={
            props.cartPopup
            ? {
                background: "rgba(0 0 0 / 25%)",
                backdropFilter: "blur(0)",
                height: "100vh",
                width: "100%",
                }
            : {
                background: "transparent",
                backdropFilter: "blur(0)",
                width: "0",
                height: "0",
                transition:
                    "height 0s linear 1.5s, width 0s linear 1.5s, background 1.5s ease 0s, backdrop-filter 1.5s ease 0s"
                }
            }
        >
            <div
            className={
            props.cartPopup
                ? "mini-cart-overlay2 increase-cart-overlay2"
                : "mini-cart-overlay2 decrease-cart-overlay2"
            }
            >  
                
                <div className="mini-cart">
                    <CartTable addedToCart={props.addedToCart} setAddedToCart={props.setAddedToCart}/>
                    <div
                    className="close-popup"
                    onClick={props.cartPopup}
                    >
                        <div className="close-cross1"></div>
                        <div className="close-cross2"></div>
                    </div>
                </div>
            </div>
        </div>);
}

export default MiniCart;