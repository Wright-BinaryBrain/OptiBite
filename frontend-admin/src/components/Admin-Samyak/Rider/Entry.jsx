import React, { useState } from "react";

import axios from "axios";

function Entry(props) {
  function delRider(id) {
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/v1/deleteRider/${id}`, {
        withCredentials: true,
      })
      .then(() => props.RefreshC())
      .catch((err) => console.log(err));
  }

  function handleEdit(id) {
    props.setId(id);
    props.toggleEdit();
  }
  const [delPrompt, setDelPrompt] = useState(false);
  console.log(delPrompt);

  return (
    <>
      <tbody>
        <tr>
          <td>
            <img
              src={`http://localhost:4000/uploads/${props.image}`}
              alt=""
              height={"100px"}
              width={"100px"}
            />
          </td>
          <td>{props.uname}</td>
          <td>{props.contact}</td>
          <td>{props.address}</td>
          <td>{props.email}</td>
          <td className="editBtn">
            <button onClick={() => handleEdit(props.id)}>Edit</button>
          </td>
          <td className="delBtn" onClick={() => setDelPrompt(true)}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  stroke="#FF3434"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
      {delPrompt ? (
        <div className="prompt-container">
          <div className="deletePrompt">
            <p>Are you sure you want to delete this entry?</p>
            <span>This action cannot be undone</span>
            <div className="promptBtn">
              <button
                onClick={() => {
                  delRider(props.id);
                  setDelPrompt(false);
                }}
                className="promptDel"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setDelPrompt(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Entry;
