import React, { useState, useEffect } from "react";
import axios from "../Axios";

function EditPopUp(props) {
  const [editAdmin, setEditAdmin] = useState({
    aName: "",
    aPassword: "",
    aAddress: "",
    aContact: "",
    aOptional: "",
    aEmail: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/getUser/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setEditAdmin((prevV) => {
          return {
            ...prevV,
            aName: res.data.data.name,
            aPassword: res.data.data.password,
            aAddress: res.data.data.address,
            aContact: res.data.data.contactNo1,
            aOptional: res.data.data.contactNo2,
            aEmail: res.data.data.email,
          };
        });
      })
      .catch((err) => console.log(err));
  }, [props.id]);

  function handleInput(event) {
    const { name, value } = event.target;
    setEditAdmin((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .patch(
        `http://localhost:4000/api/v1/updateUser/${props.id}`,
        {
          name: editAdmin.aName,
          email: editAdmin.aEmail,
          password: editAdmin.aPassword,
          contactNo1: editAdmin.aContact,
          contactNo2: editAdmin.aOptional,
          address: editAdmin.aAddress,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        props.showEdit();
        props.RefreshC();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="addpopup-container"
      style={props.pop ? { display: "block" } : { display: "none" }}
    >
      <div className="addpop-container">
        <div className="pop-head">Edit Admin</div>
        <div className="admin-close-btn">
          <button onClick={props.showEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
            >
              <path
                fill="#777"
                d="M11 .5C5.15.5.5 5.15.5 11S5.15 21.5 11 21.5 21.5 16.85 21.5 11 16.85.5 11 .5Zm4.05 15.75L11 12.2l-4.05 4.05-1.2-1.2L9.8 11 5.75 6.95l1.2-1.2L11 9.8l4.05-4.05 1.2 1.2L12.2 11l4.05 4.05-1.2 1.2Z"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"text"}
            onChange={handleInput}
            value={editAdmin.aName}
            name="aName"
            required
          />
          <label>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"password"}
            onChange={handleInput}
            value={editAdmin.aPassword}
            name="aPassword"
            required
          />
          <label>
            Address <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"text"}
            onChange={handleInput}
            value={editAdmin.aAddress}
            name="aAddress"
            required
          />
          <label>
            Contact no. <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"text"}
            onChange={handleInput}
            value={editAdmin.aContact}
            name="aContact"
            required
          />
          <label>Optional</label>
          <input
            type={"text"}
            onChange={handleInput}
            value={editAdmin.aOptional}
            name="aOptional"
          />
          <label>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"email"}
            onChange={handleInput}
            value={editAdmin.aEmail}
            name="aEmail"
            required
          />
          <button
            type="submit"
            className="admin-save-btn"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPopUp;
