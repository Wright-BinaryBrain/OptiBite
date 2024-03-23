import React from "react";

function DropdownUnit(props) {
  return (
    <div className="dropdown-unit-container">
      <select id={props.unitid} name={props.unitname} className="dropdown-unit">
        <option value={props.defaultunit}>{props.defaultunit}</option>
        {/* {props.secondUnitType != null ? <option value={props.secondUnitType}>{props.secondUnitType}</option> : null} */}
      </select>
    </div>
  );
}

export default DropdownUnit;
