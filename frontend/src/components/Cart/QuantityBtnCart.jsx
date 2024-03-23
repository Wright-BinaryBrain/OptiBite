import React, { useState, useEffect } from "react";

function QuantityBtnCart(props) {

  const [quantity, setQuantity] = useState(props.qtyBtn);
  var qtyValue;

  useEffect(()=> {
    qtyValue = JSON.parse(localStorage.getItem("sabjilandAddToCart"));
    for (let i = 0; i < qtyValue.length; i++){
      if (String(qtyValue[i]._id) === String(props.storageId)){
        setQuantity(qtyValue[i].qtyBtn);
        break;
      }
    }
  },[props.addedToCart]);

  useEffect(() => {
    qtyValue = JSON.parse(localStorage.getItem("sabjilandAddToCart"));
    for (let i = 0; i < qtyValue.length; i++){
      if (String(qtyValue[i]._id) === String(props.storageId)){
        qtyValue[i].qtyBtn = quantity;
        break;
      }
    }
    localStorage.removeItem("sabjilandAddToCart");
    localStorage.setItem("sabjilandAddToCart", JSON.stringify(qtyValue));
    props.setAddedToCart(JSON.parse(localStorage.getItem("sabjilandAddToCart")));
  }, [quantity]);

  function handleChange(event) {
    const newValue = event.target.value;
    setQuantity(newValue);
  }

  function addNumber() {
    setQuantity((prevValue) => Number(prevValue) + 0.5);
  }

  function subtractNumber() {
    setQuantity((prevValue) =>
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
        // id={props.inputid}
        // name={props.inputname}
        onChange={handleChange}
        value={quantity}
      />
      <div className="add-btn" onClick={addNumber}>
        <div className="plus-sign-horizontal"></div>
        <div className="plus-sign-vertical"></div>
      </div>
    </div>
  );
}

export default QuantityBtnCart;
