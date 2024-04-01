// import React from "react";

// function NavHeader(props) {
//   return (
//     <a
//       href={props.navHeaderLink}
//       className="nav-links, nav-header-position"
//       aria-label="Cyver, navigation header"
//       style={props.largeScreen ? { left: "112px" } : { left: "80px", top: "0" }}
//     >
//       <h3 className="nav-header">
//         S<span style={{ color: "#FFB830" }}>Y</span>VAR {/*navHeader*/}
//       </h3>
//     </a>
//   );
// }

// export default NavHeader;

import React from "react";
import HamburgerIcon from "./HamburgerIcon.jsx";
import {Link} from "react-router-dom";

import "../../CSS/headercontact.css"

function NavHeader(props) {
  return (
    <Link
      to={"/Shop"}
      className="nav-links, nav-category-position"
      aria-label="Cyver, navigation header"
      // style={props.largeScreen ? { left: "50px" } : { left: "50px", top: "0" }}
      style={props.largeScreen ? { left: "50px" } : { display: "none" }}
    >
      <button className="nav-category">
        <p className="all-category">ALL CATEGORY</p>
      </button>
    </Link>
  );
}

export default NavHeader;
