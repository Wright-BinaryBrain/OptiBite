import React from "react";
import { NavLink } from "react-router-dom";

function NavItemList(props) {
  const mediaQuery = window.matchMedia('(max-width: 800px)');

  function handleClick() {
    window.scrollTo({ top:0, left:0, behavior: "instant"});
    if (mediaQuery.matches) {
      document.querySelector(".hamburger-icon").click();
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      window.scrollTo({ top:0, left:0, behavior: "instant"});
      if (mediaQuery.matches) {
        document.querySelector(".hamburger-icon").click();
      }
    }
  }

  return (
    <ul
      className="nav-unordered-list"
      style={props.largeScreen ? {} : props.listPosition}
    >
      {props.navItems.map((itemValue, itemIndex) =>
        props.navLinks.map((linkValue, linkIndex) =>
          itemIndex === linkIndex ? (
            <li
              className="nav-items"
              key={"listItem" + String(itemIndex)}
              id={"navList" + String(itemIndex + 1)}
            >
              <NavLink
                to={linkValue}
                className="nav-links"
                key={"itemLink" + String(itemIndex)}
                id={"nav" + String(itemIndex + 1)}
                aria-label={itemValue + ", navigation item"}
                tabIndex={props.largeScreen ? "0" : props.tabIndexing}
                onClick={handleClick}
                onKeyPress={handleKeyPress}
              >
                <div
                  className="nav-line nav-line1"
                  key={"line1" + String(itemIndex)}
                ></div>
                <div
                  className="nav-line nav-line2"
                  key={"line2" + String(itemIndex)}
                ></div>
                {itemValue}
              </NavLink>
            </li>
          ) : null
        )
      )}
    </ul>
  );
}

export default NavItemList;
