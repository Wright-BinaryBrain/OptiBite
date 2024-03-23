import React from "react";

function PriceAndStock(props) {
  return (
    <div className="product-amt">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <p className="product-crossed-price">
          {props.crossedrate === "" ? (
            ""
          ) : (
            <span>
              <span style={{ textDecorationLine: "line-through" }}>
                {props.crossedrate != null ? "Rs." + props.crossedrate : null}
              </span>
              {props.crossedrate != null ? <span style={{ textDecorationLine: "none" }}>&nbsp;&nbsp;</span> : null}
            </span>
          )}
        </p>
        <p className="product-price">
          Rs.<span style={{ color: "#BE4217" }}>{props.rate}/-</span>
          <span>&nbsp;&nbsp;</span>
        </p>
      </div>
      <p className="product-stock">
        {props.stock === "InStock" ? (
          <span style={{ color: "#216600" }}>IN STOCK</span>
        ) : (
          <span style={{ color: "#BE4217" }}>OUT OF STOCK</span>
        )}
      </p>
    </div>
  );
}

export default PriceAndStock;
