import React, { useEffect, useState } from "react";
import "./riderA.css";
import Input from "../Order/Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RiderEdit(props) {
  const [file, setFile] = useState([]);
  const [doc, setDoc] = useState([]);

  const [editRider, setEditRider] = useState({
    rName: "",
    rContact: "",
    rAddress: "",
    rEmail: "",
    rImage: file,
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // console.log(props.id);

    if (props.id !== "") {
      axios
        .get(`https://backend.sabjiland.com/api/v1/getRider/${props.id}`)
        .then((res) => {
          console.log(res.data.data);
          setEditRider((prevV) => {
            return {
              ...prevV,
              rName: res.data.data.riderName,
              rContact: res.data.data.contact,
              rAddress: res.data.data.address,
              rEmail: res.data.data.email,
            };
          });
          setFile(
            `https://backend.sabjiland.com/uploads/${res.data.data.image[0]}`
          );
        })
        .catch((err) => console.log(err));
    }
  }, [props.id, props.ToggleEdit]);

  function handleChange(e) {
    if (file == null) {
      let sel = URL.createObjectURL(e.target.files[0]);
      setFile((prevV) => [sel]);
      setEditRider((prevV) => {
        return {
          rImage: file,
        };
      });
    }

    // console.log(file);
    const full = Array.from(e.target.files);
    setDoc((prevDoc) => [...full]);
  }

  function DeleteImg(id) {
    setFile(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(file);
    console.log(doc[0]);
    setSubmit(true);

    axios
      .patch(
        `https://backend.sabjiland.com/api/v1/updateRider/${props.id}`,
        {
          riderName: editRider.rName,
          contact: editRider.rContact,
          address: editRider.rAddress,
          email: editRider.rEmail,
          image: doc[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        props.RefreshC();
        props.triggerSuccess({ method: "put", state: true });

        CloseEdit();
      })

      .catch((err) => {
        console.log(err);
        const msg = err.response.data.message.split(" ");
        console.log(msg);
        console.log(msg[16]);
        if (msg[10] == "duplicate") {
          if (msg[16] === "email_1") {
            console.log("aaaaaaaa");
            toast.error("Email already used, please use another email");
          } else if (msg[16] === "contact_1") {
            toast.error("Contact already used, please use another contact");
          }
        }
      });
  }

  function CloseEdit() {
    props.ToggleEdit();
    setEditRider({
      rName: "",
      rContact: "",
      rAddress: "",
      rEmail: "",
      rImage: file,
    });
    setFile([]);
    setDoc([]);
    setSubmit(false);
  }

  function handleInput(event) {
    const { name, value } = event.target;
    setEditRider((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });
  }

  return (
    <div
      className="pop-container"
      style={props.showEdit ? { display: "block" } : { display: "none" }}
    >
      {submit ? <ToastContainer /> : ""}

      <div className="addR-container">
        <div className="close-btn">
          <button onClick={props.ToggleEdit}>
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
        <div className="addR-heading">Edit Riders</div>
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
                  value={editRider.rName}
                  onChange={handleInput}
                  required
                />
                <label>
                  Contact no. <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  type="text"
                  name="rContact"
                  value={editRider.rContact}
                  onChange={handleInput}
                  required
                />
                <label>
                  Address <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  type="text"
                  name="rAddress"
                  value={editRider.rAddress}
                  onChange={handleInput}
                  required
                />
                <label>Email</label>
                <Input
                  type="text"
                  name="rEmail"
                  value={editRider.rEmail}
                  onChange={handleInput}
                />
              </div>
              <div className="addR-button">
                <button onSubmit={handleSubmit}>Save</button>
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
              <div style={{ display: "flex" }}>
                {/* {file.map((url, index) => { */}
                {/* return ( */}
                {file ? (
                  <div className="added-doc">
                    <img src={file} alt={file} height="72px" width="72px" />
                    <svg
                      onClick={() => DeleteImg()}
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
                ) : null}
                {/* )
                                })
                                } */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RiderEdit;
