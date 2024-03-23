import React, { useState } from "react";
import { GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";

function HeaderContact(props) {
  return (
    <div
      className="headercontact"
      style={props.navVisible > 0 ? { top: "-50px" } : { top: 0 }}
    >
      <div className="navcontact-container">
        <GrMail className="mail-icon" />
        <p className="navcontact-info">sabjiland@gmail.com</p>
        <BsFillTelephoneFill className="phone-icon" />
        <p className="navcontact-info">+977 9801077972</p>
      </div>
    </div>
  );
}

export default HeaderContact;
