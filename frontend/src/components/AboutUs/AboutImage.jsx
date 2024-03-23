import "./aboutus.css";

function AboutImage(props) {
  return (
    <div className={props.divClass}>
      <img src={props.image} className={props.class} alt="" />
    </div>
  );
}

export default AboutImage;
