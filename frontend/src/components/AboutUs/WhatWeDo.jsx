import WhatWe from "./WhatWe";
import WhatDiv from "./WhatDiv";
import React from "react";
import Carousel from "react-elastic-carousel";
import "./aboutus.css";

// const breakPoints = [{ width: 650, itemsToShow: 1 }];

function WhatWeDo() {
  return (
    <div>
      <h2>What We Do</h2>
      <div className="why-flex">
        {WhatWe.map((whatItem) => {
          return (
            <WhatDiv
              id={whatItem.id}
              image={whatItem.image}
              title={whatItem.title}
              brief={whatItem.brief}
            />
          );
        })}
      </div>
      <div className="what-mobile">
        <Carousel itemsToShow={1}>
          {WhatWe.map((whatItem) => {
            return (
              <WhatDiv
                id={whatItem.id}
                image={whatItem.image}
                title={whatItem.title}
                brief={whatItem.brief}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default WhatWeDo;
