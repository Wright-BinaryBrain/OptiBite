import AboutLanding from "./AboutLanding";
import WhyUS from "./WhyUS";
import WhatWeDo from "./WhatWeDo";
import How from "./How";
import Message from "./Message";
import "./aboutus.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      <AboutLanding />
      <div className="about-container">
        <WhyUS />
        <WhatWeDo />
        <How />
        <Message />
      </div>
    </div>
  );
}

export default AboutUs;
