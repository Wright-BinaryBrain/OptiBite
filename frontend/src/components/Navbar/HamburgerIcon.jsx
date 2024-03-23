import React, { useState } from "react";

function HamburgerIcon(props) {
  const burgerLines = ["burger-line1", "burger-line2", "burger-line3"];
  const [burgerIcon, setBurgerIcon] = useState(true);
  const [burgerLine1, setBurgerLine1] = useState({});
  const [burgerLine2, setBurgerLine2] = useState({});
  const [burgerLine3, setBurgerLine3] = useState({});
  const clickedBurgerLines = [burgerLine1, burgerLine2, burgerLine3];

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      document.querySelector(".hamburger-icon").click();
    }
  }

  function handleBurgerClick() {
    if (burgerIcon === true) {
      setBurgerLine1({
        top: "50%",
        transform: "translate(-50%, -50%) rotate(45deg)",
        transformOrigin: "center",
        transition: "top 0.2s linear, transform 0.2s linear 0.2s"
      });
      setBurgerLine2({
        width: "0px",
        transition: "all 0s",
        transitionDelay: "0.2s"
      });
      setBurgerLine3({
        top: "50%",
        transform: "translate(-50%, -50%) rotate(-45deg)",
        transformOrigin: "center",
        transition: "top 0.2s linear, transform 0.2s linear 0.2s"
      });
      props.navHeight(true);
    } else {
      setBurgerLine1({});
      setBurgerLine2({});
      setBurgerLine3({});
      props.navHeight(false);
    }
    setBurgerIcon((prevValue) => !prevValue);
  }

  return (
    <div className="burger-container">
      <div
        className="hamburger-icon"
        aria-label="navigation collapse button"
        onClick={handleBurgerClick}
        onKeyPress={handleKeyPress}
        tabIndex="0"
      >
        {burgerLines.map((value, index) => (
          <div
            className={"burger-lines " + value}
            key={"burgerLine" + String(index)}
            style={clickedBurgerLines[index]}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HamburgerIcon;
