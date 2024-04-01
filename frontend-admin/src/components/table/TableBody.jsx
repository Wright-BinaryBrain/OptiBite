import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function TableBody({
  tableData,
  columns,
  update,
  delUrl,
  preFilled,
  toggleRefresh,
  totalData,
}) {
  const deleteEntry = (id) => {
    fetch(`http://localhost:4000/api/v1/${delUrl}/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      // .then(
      //   updateId(id),
      //   setCount((prevCount) => prevCount + 1),
      //   console.log(count)
      // )
      .then((res) => {
        toggleRefresh();
        // res.json().then((resp) => {
        //   setrePage(currentPage - 1);
        //   // setPaginatedPosts(_(tableData).slice(0).take(2).value());
        // });
      });
  };

  const [delPrompt, setDelPrompt] = useState(false);
  const [delId, setDelId] = useState();
  function Btn(props) {
    const ref = useRef();
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    const [show, setShow] = useState(false);

    return (
      <div ref={ref} className="table-menu-container">
        <span
          onClick={() => {
            setShow(!show);
          }}
        >
          <BsThreeDotsVertical />
        </span>
        {show ? (
          <div className="table-menu">
            <ul>
              <li
                onClick={() => {
                  // deleteEntry(props.id);
                  setDelPrompt(true);
                  setDelId(props.id);
                  setShow(false);
                }}
              >
                Delete
              </li>
              <hr />
              <li
                onClick={() => {
                  delUrl === "deleteBestSeller"
                    ? preFilled(props.pid)
                    : preFilled(props.id);
                  update();
                  setShow(false);
                  console.log("here", props.id);
                }}
              >
                Update
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  return (
    <>
      <tbody>
        {tableData?.map((data) => {
          return (
            <tr key={data._id} className="table-rows">
              {columns?.map(({ accessor }) => {
                if (data[accessor] === "") {
                  return <td>--</td>;
                } else {
                  if (accessor === "image") {
                    var img;
                    if (data[accessor]?.length > 1) {
                      img = data[accessor][0];
                    } else {
                      img = data[accessor];
                    }

                    return (
                      <td>
                        <img
                          src={`http://localhost:4000/uploads/${img}`}
                          alt=""
                        />
                      </td>
                    );
                  }
                  if (accessor === "productFamilyId") {
                    const familyId = totalData.find(
                      (item) => item._id === data[accessor]
                    );
                    return (
                      <td>{familyId ? familyId.productFamilyName : "--"}</td>
                    );
                  }
                  if (accessor === "discount") {
                    var discount;

                    discount =
                      ((data.crossedPrice - data.rate) / data.crossedPrice) *
                      100;

                    return (
                      <td>
                        {data.crossedPrice === null ||
                        data.crossedPrice === undefined
                          ? "0%"
                          : `${parseInt(discount)}%`}
                      </td>
                    );
                  }
                  if (accessor === "createdAt") {
                    const dateStr = data.createdAt;
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
                    return <td> {nepalTime}</td>;
                  } else {
                    return (
                      <>
                        <td key={accessor}>{data[accessor]}</td>
                      </>
                    );
                  }
                }
              })}
              <td key={data._id}>
                <Btn
                  id={data._id}
                  pid={delUrl === "deleteBestSeller" ? data.productId : ""}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      {delPrompt ? (
        <div className="prompt-container">
          <div className="deletePrompt">
            <p>Are you sure you want to delete this entry?</p>
            <span>This action cannot be undone</span>
            <div className="promptBtn">
              <button
                onClick={() => {
                  deleteEntry(delId);
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
