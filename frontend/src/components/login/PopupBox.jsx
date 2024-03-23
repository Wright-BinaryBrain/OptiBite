import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
const PopupBox = (props) => {
  return (
    <>
      <div className="popup-wrapper">
        <AiOutlineClose className="close-popup" />
        <AiFillCheckCircle className="check-mark" />
        <p className="checkout-text">Checkout</p>
        <p className="ready">Ready to checkout? Choose one option</p>
        <div className="option-btn">
          <button
            type="submit"
            className="popup-login-btn button"
            onClick={props.open}
          >
            Login
          </button>
          <button
            type="submit"
            className="popup-guest-btn button"
            onClick={props.guest}
          >
            As a Guest
          </button>
        </div>
        <p className="continue">
          Continue shopping <BsArrowRight />
        </p>
      </div>
    </>
  );
};

export default PopupBox;
