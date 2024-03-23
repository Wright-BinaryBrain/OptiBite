import React from "react";
import ButtonT from "../ButtonToggle";

function Entry(props) {
  return (
    <tbody>
      <tr key={props.id}>
        <td>{props.id}</td>
        <td>{props.uname}</td>
        <td>{props.date}</td>
        <td>
          {props.message}
          <br />
        </td>
      </tr>
    </tbody>
  );
}

export default Entry;
