import React from "react";
import ShopFilter from "./ShopFilter.jsx";
import Shop from "./Shop.jsx";

function MiniFilter(props) {
    return  (
        <div
            className="mini-filter-overlay"
            style={
            props.filterPopup
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
                    "height 0s linear 0.3s, width 0s linear 0.3s, background 0.3s ease 0s, backdrop-filter 0.3s ease 0s"
                }
            }
        >
            <div
            className={
            props.filterPopup
                ? "mini-filter-overlay2 increase-filter-overlay2"
                : "mini-filter-overlay2 decrease-filter-overlay2"
            }
            >  
                <div className="mini-filter">
                    <ShopFilter
                        filterChange={props.filterChange} 
                        initialPrice={props.initialPrice} 
                        priceRangeValue={props.priceRangeValue} 
                        priceChange={props.priceChange} 
                        vegNonVeg={props.vegNonVeg}
                    />
                    <div
                    className="close-popup-mini-filter"
                    onClick={props.handleFilterPopup}
                    >
                        <div className="close-cross1"></div>
                        <div className="close-cross2"></div>
                    </div>
                </div>
            </div>
        </div>);
}

export default MiniFilter;