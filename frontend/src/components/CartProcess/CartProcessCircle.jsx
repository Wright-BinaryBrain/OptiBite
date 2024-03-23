const CartProcessCircle = ({ num, title, classname }) => {
  return (
    <>
      <div className="cartProcessStep">
        <p className={`cartProcessingStepTitle ${classname}`}>{title}</p>
        <div className={`cart-process-circle ${classname}`}> {num}</div>
      </div>
    </>
  );
};

export default CartProcessCircle;
