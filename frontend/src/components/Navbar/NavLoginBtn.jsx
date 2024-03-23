import React from "react";

function NavLoginBtn(props) {
  return (
    <button className="navlogin-btn" onClick={props.open}>
      <div className="navlogin-txt">
        Login
      </div>
    </button>
  );
}

export default NavLoginBtn;
