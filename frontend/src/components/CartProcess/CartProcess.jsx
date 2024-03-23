import CartProcessCircle from "./CartProcessCircle";
import "./cartProcess.css";
const CartProcess = () => {
  return (
    <>
      <div className="CartProcessStepsDiv">
        <div className="cartProcessCircleDiv">
          <CartProcessCircle num={1} title={"your cart"} classname={"active"} />
          <CartProcessCircle num={2} title={"Your Order"} classname={null} />
          <CartProcessCircle num={3} title={"Checkout"} classname={null} />
          <CartProcessCircle num={4} title={"Done"} classname={null} />
        </div>

        <div className="cartProcessStepsDashedBar"></div>
      </div>

      <button className="next">next</button>
    </>
  );
};

export default CartProcess;
