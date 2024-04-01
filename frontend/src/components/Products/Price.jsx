import React from "react";

function Price(props) {
  return (
    <div className="product-amt">
      <div>
        <p className="product-crossed-price">
          {props.crossedrate === "" ? (
            ""
          ) : (
            <span>
              <span style={{ textDecorationLine: "line-through" }}>
                {props.crossedrate != null ? "$." + props.crossedrate : null}
              </span>
              {props.crossedrate != null ? (
                <span style={{ textDecorationLine: "none" }}>&nbsp;&nbsp;</span>
              ) : null}
            </span>
          )}
        </p>
        <p className="product-price">
          $<span> {props.rate}/-</span>
          <span>&nbsp;&nbsp;</span>
        </p>
      </div>
    </div>
  );
}

export default Price;
