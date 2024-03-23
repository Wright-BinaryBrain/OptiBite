import AboutDesp from "./AboutDesp";
import AboutImage from "./AboutImage";
import MissionMotto from "./MissionMotto";
import "./aboutus.css";

function AboutLanding(props) {
  return (
    <div className="about-landing">
      <AboutImage image="../images/tree.png" class="about-tree" divClass="bg" />
      <div>
        <div className="about-center">
          <h2 className="about-topic">
            <span className="about-black">About</span>{" "}
            <span className="about-green">Sabji</span>
            <span className="about-orange">Land</span>
          </h2>
          <p className="about-info">
            We are well known food supplier for premium quality, branded foods
            such as vegetables, fruits and other food products in the Nepal. We
            ensure the freshness and hygene of the products as we have our own
            farm in various parts of Nepal to produce our products. All the
            supplier and growers who meet the highest standards in their
            respective areas are the one working with us. The company holds a
            large number of consistent customers in the Kathmandu Valley with
            the strong commitment towards providing the quality to its valuable
            customers with high quality fruits, vegetables and other food
            products. We bring you the best products from all across the
            country. Above all, we give you the luxury of purchasing everything
            and anything under one roof.
          </p>
        </div>
        <div>
          <div className="about-missions">
            {MissionMotto.map((missionItem) => {
              return (
                <AboutDesp
                  id={missionItem.id}
                  class={missionItem.class}
                  title={missionItem.title}
                  desp={missionItem.desp}
                  triClass={missionItem.triClass}
                />
              );
            })}
          </div>
        </div>
      </div>
      <AboutImage image="../images/leaves.png" divClass="about-bg" />
    </div>
  );
}

export default AboutLanding;
