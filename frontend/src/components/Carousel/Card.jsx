const Card = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-items">
          <img className="product-icon" src={props.image} alt={props.title} />
          <div className="product-category">{props.title}</div>
        </div>
      </div>
    </>
  );
};
export default Card;
