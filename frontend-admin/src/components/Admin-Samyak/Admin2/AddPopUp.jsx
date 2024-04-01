import React, { useState } from "react";
import axios from "../Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPopUp(props) {
  const [addAdmin, setAddAdmin] = useState({
    aName: "",
    aPassword: "",
    aCPassword: "",
    aAddress: "",
    aContact: "",
    aOptional: "",
    aEmail: "",
  });

  function handleInput(event) {
    const { name, value } = event.target;
    setAddAdmin((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(addAdmin);

    if (
      !addAdmin.aName ||
      !addAdmin.aPassword ||
      !addAdmin.aCPassword ||
      !addAdmin.aAddress ||
      !addAdmin.aContact ||
      !addAdmin.aEmail
    ) {
      toast.error("Please fill in all required fields! *");
      return; // Exit the function if validation fails
    }

    if (addAdmin.aPassword !== addAdmin.aCPassword) {
      toast.warning("Password doesn't match!");
      return;
    }

    if (addAdmin.aOptional !== "") {
      console.log("not");
      axios
        .post(
          "http://localhost:4000/api/v1/postUser",
          {
            name: addAdmin.aName,
            email: addAdmin.aEmail,
            password: addAdmin.aPassword,
            contactNo1: addAdmin.aContact,
            contactNo2: addAdmin.aOptional,
            role: "admin",
            address: addAdmin.aAddress,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          CloseAdd();
        })
        .catch((err) => console.log(err));
    } else {
      console.log("empty");
      axios
        .post(
          "http://localhost:4000/api/v1/postUser",
          {
            name: addAdmin.aName,
            email: addAdmin.aEmail,
            password: addAdmin.aPassword,
            contactNo1: addAdmin.aContact,
            role: "admin",
            address: addAdmin.aAddress,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          CloseAdd();
        })
        .catch((err) => console.log(err));
    }

    // console.log(addAdmin);
  }

  function CloseAdd() {
    props.showAdd();
    props.RefreshC();
    setAddAdmin({
      aName: "",
      aPassword: "",
      aCPassword: "",
      aAddress: "",
      aContact: "",
      aOptional: "",
      aEmail: "",
    });
  }

  return (
    <div
      className="addpopup-container"
      style={props.pop ? { display: "block" } : { display: "none" }}
    >
      <ToastContainer />
      <div className="addpop-container">
        <div className="pop-head">Add Admin</div>
        <div className="admin-close-btn">
          <button onClick={CloseAdd}>
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
            value={addAdmin.aName}
            name="aName"
            required
          />
          <label>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"password"}
            onChange={handleInput}
            value={addAdmin.aPassword}
            name="aPassword"
            minLength="6"
            required
          />
          <label>
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"password"}
            onChange={handleInput}
            value={addAdmin.aCPassword}
            name="aCPassword"
            required
          />
          <label>
            Address <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"text"}
            onChange={handleInput}
            value={addAdmin.aAddress}
            name="aAddress"
            required
          />
          <label>
            Contact no. <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"text"}
            onChange={handleInput}
            value={addAdmin.aContact}
            name="aContact"
            required
          />
          <label>Optional Contact</label>
          <input
            type={"text"}
            onChange={handleInput}
            value={addAdmin.aOptional}
            name="aOptional"
          />
          <label>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={"email"}
            onChange={handleInput}
            value={addAdmin.aEmail}
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

export default AddPopUp;
