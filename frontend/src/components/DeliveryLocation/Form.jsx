import React from "react";
import Input from "./Input";

function Form() {
  return (
    <div className="form-section">
      <form>
        <div className="name">
          <label>Address Title</label>
          <Input type="text" placeholder="Home" />
        </div>
        <div className="name">
          <label>Full Name</label>
          <Input type="text" placeholder="Name" />
        </div>
        <div className="name">
          <label>Company Name</label>
          <Input type="text" placeholder="Organization Name" />
        </div>
        <div className="name">
          <label>Detailed Address Direction</label>
          <textarea placeholder="Eg. Near Bus Stop"></textarea>
        </div>
        <div className="form-btm">
          <div className="default-checkbox">
            <Input type="checkbox" />
            <span>Set as default address</span>
          </div>
          <div className="buttons">
            <button className="save-btn">Save</button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
