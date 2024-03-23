// import React from "react";

// function NavLogo(props) {
//   return (
//     <a
//       href={props.navHeaderLink}
//       className="nav-links, nav-header-position"
//       aria-label="Cyver Tech Logo"
//       style={props.largeScreen ? {} : { top: "7.8px" }}
//     >
//       <img
//         src="../images/image 1.png"
//         alt="SabjiLand Logo"
//         className="nav-header-logo"
//       />
//     </a>
//   );
// }

// export default NavLogo;
//
//
//

import React from "react";
import {Link} from "react-router-dom";

function NavLogo(props) {
  return (
    <Link
      to={props.navHeaderLink}
      className="nav-links"
      aria-label="Cyver Tech Logo"
      style={props.largeScreen ? {} : { top: "7.8px" }}
    >
      <img
        src="../images/sabjiland brofront 2.png"
        alt="SabjiLand Logo"
        className="nav-header-logo"
      />
    </Link>
  );
}

export default NavLogo;
