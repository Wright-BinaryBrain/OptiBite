import React,{useState} from "react";
import OrderNow from "./OrderNow.jsx";
import CartProcess from "../CartProcess/CartProcess.jsx";
import "./paymentDetails.css"

function Payment(props) {
  const [qrImage, setQrImage] = useState(null);
  function handleaImage(event) {
    const { name, value, files } = event.target;
   console.log(files);
      const file = Array.from(files);
      setQrImage(file[0]);

    
  }

  return (
    <div className="payment-container">
      <div className="payment-path">
        Home&nbsp;&gt;&nbsp;
        <span style={{ color: "#BE4217" }}>
          Cart&nbsp;&gt;&nbsp;Billing Detail&nbsp;&gt;&nbsp;Payment
        </span>
      </div>
      {/* <CartProcess /> */}
      <div className="order-now-container">
        <div className="payment-details">



        <div className="payment-details-heading">Payment Details</div>
        <div className="paymentQr">

          <img src="https://i.postimg.cc/Y2WF4kJN/qqqqqq.png" alt="" />
        </div>
        <form enctype="multipart/form-data">
          <label>Upload payment screenshot</label>
        <div className="paymentImage">
         
          <input type="file" name="file" accept="image/png, image/jpeg" onChange={handleaImage}/>
        </div>
        </form>
        </div>
        <div>
          <OrderNow setAddedToCart={props.setAddedToCart} qrImage={qrImage} isOrderCart={props.isOrderCart} setOrderResponse={props.setOrderResponse}
          setOrderQuantity={props.setOrderQuantity} />
        </div>
      </div>
    </div>
  );
}

export default Payment;
