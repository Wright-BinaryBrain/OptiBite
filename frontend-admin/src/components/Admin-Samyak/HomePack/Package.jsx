import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPackage from "./AddPackage";
import EditPackage from "./EditPackage";

function Package() {
  const [pack, setPack] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [delPrompt, setDelPrompt] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [ePack, setEPack] = useState(false);
  const [eid, setEid] = useState("");
  const [delId, setDelId] = useState("");
  function getPackageApi() {
    axios
      .get(`http://localhost:4000/api/v1/getAllPackage`, {
        withCredentials: true,
      })
      .then((res) => {
        setPackageData(res.data.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPackageApi();
  }, [refresh]);

  function showPack() {
    setPack((prev) => {
      return !prev;
    });
  }

  function editPack(id) {
    setEPack((prev) => !prev);
    setEid(id);
  }

  function closeEdit() {
    setEPack((prev) => !prev);
  }

  function deletePackage(id) {
    console.log(id);
    axios
      .delete(`http://localhost:4000/api/v1/deletePackage/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRefresh((prev) => !prev);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <AddPackage showPack={showPack} pack={pack} refresh={setRefresh} />
      <EditPackage
        showPack={closeEdit}
        pack={ePack}
        refresh={setRefresh}
        editId={eid}
        setEid={setEid}
      />
      <div className="package-top">
        <h1 className="admin-title">Package</h1>
        <button onClick={showPack}>Add Package</button>
      </div>
      <div className="package-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Created Date</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          {packageData.map((item) => {
            const dateStr = item.createdAt;
            const date = new Date(dateStr);
            const options = {
              timeZone: "Asia/Kathmandu",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            };
            const nepalTime = date.toLocaleString("en-US", options);
            const onlyDate = nepalTime.split(",")[0].trim();

            return (
              <>
                <tbody>
                  <tr id="item._id">
                    <td>
                      <img
                        src={`http://localhost:4000/uploads/${item.image}`}
                        height={"48px"}
                        width={"48px"}
                      />
                    </td>
                    <td>{item.packageName}</td>
                    <td>{onlyDate}</td>
                    <td className="edit-btn">
                      <button onClick={() => editPack(item._id)}>Edit</button>
                      {/* </td> */}
                      <div className="del-btn">
                        <button
                          onClick={() => {
                            setDelPrompt(true);
                            setDelId(item._id);
                          }}
                        >
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
                      </div>
                    </td>
                  </tr>
                  {delPrompt ? (
                    <div className="prompt-container">
                      <div className="deletePrompt">
                        <p>Are you sure you want to delete this entry?</p>
                        <span>This action cannot be undone</span>

                        <div className="promptBtn">
                          <button
                            onClick={() => {
                              deletePackage(delId);
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
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Package;
