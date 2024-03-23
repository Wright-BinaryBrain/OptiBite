import React, { useState, useEffect, useRef } from "react";
import TableHead from "../../table/TableHead";
import Search from "../search";
import Table from "../../table/Table";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAddCircle, MdRemoveCircle } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AddBestSellers({ totalData, ...props }) {
  const [data, setData] = useState();
  const [prevData, setPrevData] = useState();
  const [i, seti] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  console.log(totalData);
  useEffect(() => {
    const url = `https://backend.sabjiland.com/api/v1/getProducts`;
    // const url2 = `http://192.168.101.11:4004/bestSeller`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        // const response2 = await fetch(url2);
        const json = await response.json();
        // const json2 = await response2.json();
        // setShowdata(json2);
        setData(json.data);
        console.log("ddd", data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    setPrevData(totalData);
  }, []);

  const ref = useRef();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.close(!props.close);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleSearch = (e) => {
    setSearchQuery(e);
    console.log(searchQuery);
  };

  // const handleAdd = () => {
  //   const date = new Date();
  //   const dates = String(date);
  //   const obj = { date: dates.slice(3, 21) };
  //   let jsonS;
  //   newData.map((data) => {
  //     const jsonData = Object.assign(data);
  //     console.log(jsonData);
  //     const bestSellerData = { productId: jsonData._id };
  //     console.log(bestSellerData);

  //     // console.log(e);
  //     // console.log(jsonS);
  //     // jsonS = JSON.stringify(jsonData);
  //     axios
  //       .post(`https://backend.sabjiland.com/api/v1/postBestSeller`, bestSellerData, {
  //         withCredentials: true,
  //       })
  //       .then(() => {
  //         props.toggleRefresh();
  //         props.close(false);
  //       })

  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   });
  // };

  const handleAdd = async () => {
    const date = new Date();
    const dates = String(date);
    const obj = { date: dates.slice(3, 21) };
    try {
      await Promise.all(
        newData.map(async (data) => {
          const jsonData = Object.assign(data);
          console.log(jsonData);
          const bestSellerData = { productId: jsonData._id };
          console.log(bestSellerData);

          await axios.post(
            "https://backend.sabjiland.com/api/v1/postBestSeller",
            bestSellerData,
            {
              withCredentials: true,
            }
          );
        })
      );
      props.toggleRefresh();
      props.close(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    { label: "#", accessor: "id", sortable: true },
    { label: "", accessor: "image", sortable: false },
    { label: "Product", accessor: "productName", sortable: true },
    // { label: "Rate", accessor: "rate", sortable: true },
    // { label: "Stock", accessor: "stock", sortable: true },
    // { label: "Unit", accessor: "unit", sortable: false },
  ];

  const [finalData, setFinalData] = useState();
  useEffect(() => {
    setFinalData(data);
  }, [data]);
  console.log(finalData);
  const [newData, setNewData] = useState([]);

  const handleToggle = (id) => {
    seti(id);
    console.log(id);
    const newArray = finalData.find((item) => item._id === id);
    console.log(newArray);
    const newDataIndex = prevData.findIndex((item) => item._id === id);
    console.log(newDataIndex);
    if (newDataIndex !== -1) {
      // const newDataArray = [...newData];
      // newDataArray.splice(newDataIndex, 1);
      // setNewData(newDataArray);
      toast.error("Product already added", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setNewData([...newData, newArray]);
    }
  };
  console.log(newData);

  const removeToggle = (id) => {
    console.log("h");
    // const newArray = finalData.find((item) => item.id === id);
    const newDataIndex = newData.findIndex((item) => item.id === id);
    const newDataArray = [...newData];
    newDataArray.splice(newDataIndex, 1);
    setNewData(newDataArray);
  };

  function BestsellerTable({ btnClick, ...props }) {
    const filterData = props.shouldFilter
      ? props.tabledata?.filter((entry) =>
          entry.productName?.toLowerCase().includes(searchQuery)
        )
      : props.tabledata;
    return (
      <>
        {filterData?.map((entry) => {
          console.log(entry);
          return (
            <tr
              key={entry.id}
              onClick={props.shouldFilter ? () => btnClick(entry?._id) : ""}
              className={props.shouldFilter ? "cursor" : ""}
            >
              {columns?.map(({ accessor }) => {
                if (entry[accessor] === "") {
                  return <td>--</td>;
                } else {
                  if (accessor === "image" && props.shouldFilter) {
                    return "";
                  }
                  if (accessor === "image" && !props.shouldFilter) {
                    return (
                      <td>
                        <img
                          src={`https://backend.sabjiland.com/uploads/${entry[accessor]}`}
                          alt=""
                        />
                      </td>
                    );
                  }
                  if (accessor === "id") {
                    return <td>{props.tabledata?.indexOf(entry) + 1}</td>;
                  } else {
                    return (
                      <>
                        <td key={accessor}>{entry[accessor]}</td>
                      </>
                    );
                  }
                }
              })}
              <td>
                <button
                  onClick={() => btnClick(entry?._id)}
                  className={`${props.btnClass} ${
                    newData.some((dataItem) => dataItem?._id === entry?._id)
                      ? ""
                      : ""
                  }`}
                >
                  {!props.shouldFilter
                    ? props.btn
                    : newData.some((dataItem) => dataItem?._id === entry?._id)
                    ? // <MdRemoveCircle />
                      ""
                    : ""}
                </button>
                {/* <Btn id={entry.id} data={prevData} c={a} /> */}
              </td>
            </tr>
          );
        })}
      </>
    );
  }
  return (
    <>
      <ToastContainer />
      <div className="add-bestseller" ref={ref}>
        <h3>Product List</h3>
        <button className="close-add" onClick={props.close}>
          <AiOutlineClose />
        </button>
        <div className="search-box">
          <Search
            totalData={finalData}
            onSearch={handleSearch}
            searchClass="new-search"
          />
          <button onClick={handleAdd} className="bestseller-add-btn">
            Add
          </button>
        </div>
        <div className={searchQuery != "" ? "bestseller-container" : ""}>
          {searchQuery != "" ? (
            <table className={`bestSeller-table`}>
              <BestsellerTable
                tabledata={finalData}
                btnClass="BestSellerBtn"
                btnClick={handleToggle}
                shouldFilter={true}
                btn={<MdOutlineAddCircle />}
              />
            </table>
          ) : (
            ""
          )}
        </div>
        <div>
          {newData?.length != 0 ? (
            <>
              <hr />
              <div className="bestseller-container2">
                {" "}
                <table className="react-table">
                  {/* <TableHead columns={columns} /> */}
                  <thead>
                    <tr className="table-rows">
                      <th>#</th>
                      <th></th>
                      <th>Products</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <BestsellerTable
                      tabledata={newData}
                      btn={<RiDeleteBin2Line />}
                      btnClass="bestseller-remove"
                      btnClick={removeToggle}
                      shouldFilter={false}
                    />{" "}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        {/* <div>
        <Table data={newData} columns={props.col} topclass="hide-div" />
      </div> */}
      </div>
    </>
  );
}

export default AddBestSellers;
