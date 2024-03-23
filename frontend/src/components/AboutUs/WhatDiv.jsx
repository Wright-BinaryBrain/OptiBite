import "./aboutus.css";

function WhatDiv(props) {
  return (
    <div className="what-div">
      <img src={props.image} className="what-img" alt="" />
      <p className="what-title">{props.title}</p>
      <p className="why-desp">{props.brief}</p>
    </div>
  );
}

export default WhatDiv;
