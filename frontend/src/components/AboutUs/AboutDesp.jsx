import "./aboutus.css";

function AboutDesp(props) {
  return (
    <div className="about-triangle">
      <div className={props.class}>
        <h4 className="about-title">{props.title}</h4>
        <hr className="about-hr" />
        <p className="about-desp">{props.desp}</p>
      </div>
      <div class={props.triClass}></div>
    </div>
  );
}

export default AboutDesp;
