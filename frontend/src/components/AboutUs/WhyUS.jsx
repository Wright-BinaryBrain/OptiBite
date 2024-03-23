import WhyUSDiv from "./WhyUS_div";
import Why_section from "./Why_section";
import "./aboutus.css";

function WhyUS() {
  return (
    <div className="about-why">
      <h2>Why us?</h2>
      <div className="why-flex">
        {Why_section.map((whyItem) => {
          return (
            <WhyUSDiv
              id={whyItem.id}
              img={whyItem.img}
              topic={whyItem.topic}
              description={whyItem.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WhyUS;
