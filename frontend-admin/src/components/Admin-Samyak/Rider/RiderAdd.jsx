import React, { useState } from "react";
import "./riderA.css";
import Input from "../Order/Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RiderAdd(props) {
  const [file, setFile] = useState([]);
  const [doc, setDoc] = useState([]);

  const [addRider, setAddRider] = useState({
    rName: "",
    rContact: "",
    rAddress: "",
    rEmail: "",
    rImage: file,
  });

  function handleChange(e) {
    let sel = URL.createObjectURL(e.target.files[0]);
    setFile((prevV) => [...prevV, sel]);
    setAddRider((prevV) => {
      return {
        ...prevV,
        rImage: file,
      };
    });
    // console.log(Array.from(e.target.files));
    // console.log(e.target.files)
    const full = Array.from(e.target.files);
    setDoc((prevDoc) => [...prevDoc, ...full]);
  }

  function DeleteImg(id) {
    setFile(file.filter((url, index) => index !== id));
    console.log(id);
  }
  const [submit, setSubmit] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmit(true);

    if (
      !addRider.rName ||
      !addRider.rContact ||
      !addRider.rAddress ||
      !addRider.rEmail ||
      !doc[0]
    ) {
      toast.error("Please fill in all required fields! *");
      return;
    }

    axios
      .post(
        "http://localhost:4000/api/v1/postRider",
        {
          riderName: addRider.rName,
          contact: addRider.rContact,
          address: addRider.rAddress,
          email: addRider.rEmail,
          image: doc[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        props.RefreshC();
        props.ToggleShow();
        props.triggerSuccess({ method: "post", state: true });
        setSubmit(false);

        setAddRider({
          rName: "",
          rContact: "",
          rAddress: "",
          rEmail: "",
          rImage: file,
        });
        setFile([]);
        setDoc([]);
      })
      .catch((err) => {
        console.log(err);
        const msg = err.response.data.message.split(" ");
        console.log(msg);
        console.log(msg[7]);
        if (msg[1] == "duplicate") {
          if (msg[7] === "email_1") {
            console.log("aaaaaaaa");
            toast.error("Email already used, please use another email");
          } else if (msg[7] === "contact_1") {
            toast.error("Contact already used, please use another contact");
          }
        }
      });
  }

  function CloseAdd() {
    props.RefreshC();
    props.ToggleShow();
  }

  function handleInput(event) {
    const { name, value } = event.target;
    setAddRider((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });
  }

  return (
    <div
      className="pop-container"
      style={props.showAdd ? { display: "block" } : { display: "none" }}
    >
      {submit ? <ToastContainer /> : ""}

      <div className="addR-container">
        <div className="close-btn">
          <button
            onClick={() => {
              props.ToggleShow();
              setSubmit(false);
            }}
          >
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
        <div className="addR-heading">Add Riders</div>
        <form onSubmit={handleSubmit}>
          <div className="addR-content">
            <div className="addR-left">
              <div className="addR-form">
                <label>
                  Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  type="text"
                  name="rName"
                  value={addRider.rName}
                  onChange={handleInput}
                  required
                />
                <label>
                  Contact no. <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  type="text"
                  name="rContact"
                  value={addRider.rContact}
                  onChange={handleInput}
                  required
                />
                <label>
                  Address <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  type="text"
                  name="rAddress"
                  value={addRider.rAddress}
                  onChange={handleInput}
                  required
                />
                <label>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  type="text"
                  name="rEmail"
                  value={addRider.rEmail}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="addR-button">
                <button onSubmit={handleSubmit}>Add</button>
              </div>
            </div>
            <div className="addR-right">
              <span className="upload-text">Upload Documents</span>
              <div className="border-d">
                <label>
                  <Input
                    class="custom-file-input"
                    onChange={handleChange}
                    /*onChange2={handleInput}*/ type="file"
                    title="text"
                    accept="image/jpg, image/jpeg, image/png, application/pdf"
                  ></Input>
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="36"
                  fill="none"
                >
                  <path
                    stroke="#DADADA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.667 30.667H5.001A3.667 3.667 0 0 1 1.334 27V5a3.667 3.667 0 0 1 3.667-3.667h22V10.5"
                  />
                  <path
                    stroke="#DADADA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.167 23.334H5.001A3.667 3.667 0 0 0 1.334 27m20.167-3.666 5.5-5.5m0 0 5.5 5.5m-5.5-5.5v16.5"
                  />
                </svg>
                <span className="drop-text">Drag and Drop files here</span>
                <span className="support-text">
                  Files supported: Png, Jpg, Pdf
                </span>

                <span className="choose-file">Choose File</span>
                <span className="size-text">Maximum size: 1MB</span>
              </div>
              <span className="added-text">Added Documents</span>
              <div className="doc-space">
                {file.map((url, index) => {
                  return (
                    <div className="added-doc" key={index}>
                      <img
                        src={url}
                        alt="documents"
                        height="72px"
                        width="72px"
                      />
                      <svg
                        onClick={() => DeleteImg(index)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                      >
                        <g
                          stroke="#BE4217"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          clipPath="url(#a)"
                        >
                          <path
                            fill="#fff"
                            d="M8 14.666A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.333Z"
                          />
                          <path d="m10 6-4 4M6 6l4 4" />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M0 0h16v16H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RiderAdd;
