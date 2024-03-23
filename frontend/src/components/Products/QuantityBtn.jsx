import React, { useState } from "react";

function QuantityBtn(props) {

  function handleChange(event) {
    const newValue = event.target.value;
    props.setQuantity(newValue);
  }

  function addNumber() {
    props.setQuantity((prevValue) => Number(prevValue) + 0.5);
  }

  function subtractNumber() {
    props.setQuantity((prevValue) =>
      Number(prevValue) > 0.5 ? Number(prevValue) - 0.5 : Number(prevValue)
    );
  }

  return (
    <div className="quantity-container">
      <div className="subtract-btn" onClick={subtractNumber}>
        <div className="minus-sign"></div>
      </div>
      <input
        type="number"
        className="quantity-input"
        id={props.inputid}
        name={props.inputname}
        onChange={handleChange}
        value={props.quantity}
      />
      <div className="add-btn" onClick={addNumber}>
        <div className="plus-sign-horizontal"></div>
        <div className="plus-sign-vertical"></div>
      </div>
    </div>
  );
}

export default QuantityBtn;
