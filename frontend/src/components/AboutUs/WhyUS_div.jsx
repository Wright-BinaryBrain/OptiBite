import "./aboutus.css";

function WhyUSDiv(props) {
  return (
    <div className="why-div">
      <img src={props.img} className="why-img" alt="" />
      <p className="why-topic">{props.topic}</p>
      <p className="why-desp">{props.description}</p>
    </div>
  );
}

export default WhyUSDiv;
