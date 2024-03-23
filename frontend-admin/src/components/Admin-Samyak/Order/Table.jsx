import React, { useEffect, useState } from "react";
import Entry from "./Entry";
import axios from "../Axios";
// import dataV from "./orderData";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import _ from "lodash";
function Table(props) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();

  const [order, setOrder] = useState({
    username: "",
    orderDate: "",
    total: "",
    paymentStatus: "",
    orderStatus: "",
  });
  const [userData, setUserData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  // console.log(props.orderStatus);
  //API

  // const [searchKeyword, setSearchKeyword] = useState(props.search);

  // const [filterOptions, setFilterOptions] = useState({});
  //
  console.log(props.selected);
  const getApiData = async () => {
    try {
      const params = {
        keyword: props.search,
        page: props.page,
        rowsPerPage: props.selected,
      };

      if (props.orderStatus !== "") {
        params.orderStatus = props.orderStatus;
      }
      const res = await axios.get(
        "https://backend.sabjiland.com/api/v1/getAllOrder",
        {
          params,
          withCredentials: true,
        }
      );
      const dataProp = {
        data: res.data.data,
        count: res.data.count,
        resultPerPage: res.data.resultPerPage,
      };
      props.dataCount(dataProp);
      setData(dataProp.data);
      setCount(dataProp.count);
    } catch (error) {
      console.log(error);
    }
  };
  const pageCount = count ? Math.ceil(count / props.selected) : 0;
  const pages = _.range(1, pageCount + 1);
  useEffect(() => {
    // console.log("aaaaaaaaaaaaa", props.refresh);

    getApiData();
  }, [
    props.search,
    props.page,
    props.orderStatus,
    props.selected,
    props.refresh,
  ]);

  useEffect(() => {
    axios
      .get(`https://backend.sabjiland.com/api/v1/getAllUser`, {
        withCredentials: true,
      })
      .then((res) => setUserData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  function deleteOrder(id) {
    axios
      .delete(`https://backend.sabjiland.com/api/v1/deleteOrder/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        props.RefreshC();
      })
      .catch((err) => console.log(err.message));
  }

  const [allProducts, setAllProducts] = useState([]);

  console.log(data);
  console.log(displayData);

  useEffect(() => {
    axios
      .get(`https://backend.sabjiland.com/api/v1/getProducts`, {
        withCredentials: true,
      })
      .then((res) =>
        setAllProducts(res.data.data.map((item) => ({ ...item, quantity: 0 })))
      )
      .catch((err) => console.log(err));
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedData = [];
      for (const order of data) {
        const { userId, guestName, ...rest } = order;
        let username = "";

        if (guestName) {
          username = guestName;
        } else if (userId) {
          const userEntry = await axios.get(
            `https://backend.sabjiland.com/api/v1/getUser/${userId}`,
            {
              withCredentials: true,
            }
          );
          username = userEntry.data.data.name;
        }

        updatedData.push({ ...rest, username });
      }
      const newUpdatedData = updatedData.map((dataTerm) => {
        const productIds = dataTerm.productId;
        const filteredProducts = allProducts.filter((product) =>
          productIds?.includes(product._id)
        );
        const update = filteredProducts.map((product, index) => {
          return {
            ...product,
            quantity: dataTerm.quantity[index],
          };
        });
        let total = 0;
        for (const product of update) {
          total += product.rate * product.quantity;
        }

        return {
          ...dataTerm,
          total: total,
        };
      });
      setDisplayData(newUpdatedData);
    };

    fetchData();
  }, [allProducts]);

  function createEntry(dataTerm) {
    const dateStr = dataTerm.orderDate;
    const date = new Date(dateStr);
    const options = {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    // console.log(dataTerm);
    const nepalTime = date.toLocaleString("en-US", options);
    const onlyDate = nepalTime.split(",")[0].trim();
    // if (dataTerm.guestName) {
    //   name = dataTerm.guestName;
    // } else {
    //   const userDataItem = userData.find(
    //     (item) => item._id === dataTerm.userId
    //   );
    //   if (userDataItem) {
    //     name = userDataItem.name;
    //   }
    // }

    return (
      <Entry
        key={dataTerm._id}
        id={dataTerm._id}
        uname={dataTerm.username}
        date={onlyDate}
        amount={dataTerm.total}
        pStatus={dataTerm.paymentStatus}
        oStatus={dataTerm.orderStatus}
        aRider={dataTerm.riderId} //needs to be changed
        showView={props.showView}
        setId={props.setId}
        delOrder={deleteOrder}
        showEdit={props.showEdit}
        RefreshC={props.RefreshC}
        products={dataTerm.productId}
      />
    );
  }

  const sorting = (col) => {
    const sortedCopy = [...displayData]; // Create a copy of the array
    if (order[col] === "ASC") {
      sortedCopy.sort((a, b) => {
        const acol = a[col].toLowerCase();
        const bcol = b[col].toLowerCase();
        return acol > bcol ? 1 : -1;
      });
      setDisplayData(sortedCopy);
      setOrder((prevOrder) => {
        // Loop through all the keys in prevOrder and set their values to ""
        const updatedOrder = {};
        Object.keys(prevOrder).forEach((key) => {
          updatedOrder[key] = "";
        });
        // Set the selected column to "DSC"
        updatedOrder[col] = "DSC";
        return updatedOrder;
      });
    } else if (order[col] === "" || order[col] === "DSC") {
      sortedCopy.sort((a, b) => {
        const acol = a[col].toLowerCase();
        const bcol = b[col].toLowerCase();
        return acol < bcol ? 1 : -1;
      });
      setDisplayData(sortedCopy);
      setOrder((prevOrder) => {
        // Loop through all the keys in prevOrder and set their values to ""
        const updatedOrder = {};
        Object.keys(prevOrder).forEach((key) => {
          updatedOrder[key] = "";
        });
        // Set the selected column to "ASC"
        updatedOrder[col] = "ASC";
        return updatedOrder;
      });
    }
  };
  console.log(order);
  const sortingNumb = (col) => {
    if (order[col] === "" || order[col] === "ASC") {
      const sorted = [...displayData].sort((a, b) => {
        const acol = a[col];
        const bcol = b[col];
        // return acol > bcol ? a - b : b - a;
        return acol - bcol;
      });

      setDisplayData(sorted);
      setOrder((prevOrder) => {
        // Loop through all the keys in prevOrder and set their values to ""
        const updatedOrder = {};
        Object.keys(prevOrder).forEach((key) => {
          updatedOrder[key] = "";
        });
        // Set the selected column to "DSC"
        updatedOrder[col] = "DSC";
        return updatedOrder;
      });
    }
    if (order[col] === "DSC") {
      const sorted = [...displayData].sort((a, b) => {
        const acol = a[col];
        const bcol = b[col];
        // return acol < bcol ? a - b : b - a;
        return bcol - acol;
      });
      setDisplayData(sorted);
      setOrder((prevOrder) => {
        // Loop through all the keys in prevOrder and set their values to ""
        const updatedOrder = {};
        Object.keys(prevOrder).forEach((key) => {
          updatedOrder[key] = "";
        });
        // Set the selected column to "ASC"
        updatedOrder[col] = "ASC";
        return updatedOrder;
      });
    }
  };

  const sortingDate = (col) => {
    if (order[col] === "" || order[col] === "ASC") {
      const sorted = [...displayData].sort((a, b) => {
        const dateA = a[col];
        const dateB = b[col];
        return dateA.localeCompare(dateB);
      });
      setDisplayData(sorted);
      setOrder((prevOrder) => {
        // Loop through all the keys in prevOrder and set their values to ""
        const updatedOrder = {};
        Object.keys(prevOrder).forEach((key) => {
          updatedOrder[key] = "";
        });
        // Set the selected column to "DSC"
        updatedOrder[col] = "DSC";
        return updatedOrder;
      });
    }
    if (order[col] === "DSC") {
      const sorted = [...displayData].sort((a, b) => {
        const dateA = a[col];
        const dateB = b[col];
        return dateB.localeCompare(dateA);
      });
      setDisplayData(sorted);
      setOrder((prevOrder) => {
        // Loop through all the keys in prevOrder and set their values to ""
        const updatedOrder = {};
        Object.keys(prevOrder).forEach((key) => {
          updatedOrder[key] = "";
        });
        // Set the selected column to "ASC"
        updatedOrder[col] = "ASC";
        return updatedOrder;
      });
    }
  };

  // useEffect(() => {
  //   var name;

  //   const transformedData = data.map((perD) => {
  //     const dateStr = perD.orderDate;
  //     const date = new Date(dateStr);

  //     const options = {
  //       timeZone: "Asia/Kathmandu",
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     };

  //     const nepalTime = date.toLocaleString("en-US", options);
  //     const onlyDate = nepalTime.split(",")[0].trim();

  //     if (perD.guestName) {
  //       name = perD.guestName;
  //     }
  //     if (perD.userId) {
  //       const userDataItem = userData.find((item) => item._id === perD.userId);
  //       console.log(userData.find((item) => item._id === perD.userId));
  //       console.log(userDataItem);
  //       if (userDataItem) {
  //         name = userDataItem.name;
  //       }
  //     }

  //     return {
  //       ...perD,
  //       orderDate: onlyDate,
  //       username: name,
  //     };
  //   });
  //   setDisplayData(transformedData);
  //   console.log(data);
  // }, [data, props.refresh]);

  // useEffect(() => {
  //   console.log(displayData);
  // }, [displayData]);
  console.log(order["username"]);
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr className="head-row">
              {/* <th onClick={() => sortingNumb("id")}>
                #Order ID
                <button >
                  <span
          className={`order-up ${order["username"] === "ASC" ? "dim" : ""}`}
        >
          <AiOutlineArrowUp />
        </span>
        <span
          className={`order-down ${order["username"] === "DESC" ? "dim" : ""}`}
        >
          <AiOutlineArrowDown />
        </span>
                </button>
              </th> */}
              <th onClick={() => sorting("username")}>
                User Name
                <button>
                  <span
                    className={`order-up ${
                      order["username"] === "ASC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowUp />
                  </span>
                  <span
                    className={`order-down ${
                      order["username"] === "DSC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowDown />
                  </span>
                </button>
              </th>
              <th onClick={() => sortingDate("orderDate")}>
                Date
                <button>
                  <span
                    className={`order-up ${
                      order["orderDate"] === "ASC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowUp />
                  </span>
                  <span
                    className={`order-down ${
                      order["orderDate"] === "DSC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowDown />
                  </span>
                </button>
              </th>
              <th onClick={() => sortingNumb("total")}>
                Amount
                <button>
                  <span
                    className={`order-up ${
                      order["total"] === "ASC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowUp />
                  </span>
                  <span
                    className={`order-down ${
                      order["total"] === "DSC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowDown />
                  </span>
                </button>
              </th>
              <th onClick={() => sorting("paymentStatus")}>
                Payment Status
                <button>
                  <span
                    className={`order-up ${
                      order["paymentStatus"] === "ASC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowUp />
                  </span>
                  <span
                    className={`order-down ${
                      order["paymentStatus"] === "DSC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowDown />
                  </span>
                </button>
              </th>
              <th onClick={() => sorting("orderStatus")}>
                Order Status
                <button>
                  <span
                    className={`order-up ${
                      order["orderStatus"] === "ASC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowUp />
                  </span>
                  <span
                    className={`order-down ${
                      order["orderStatus"] === "DSC" ? "dim" : ""
                    }`}
                  >
                    <AiOutlineArrowDown />
                  </span>
                </button>
              </th>
              {/* <th onClick={() => sorting("riderA")}>
                Assign Rider
                <button >
                  <span
          className={`order-up ${order["username"] === "ASC" ? "dim" : ""}`}
        >
          <AiOutlineArrowUp />
        </span>
        <span
          className={`order-down ${order["username"] === "DESC" ? "dim" : ""}`}
        >
          <AiOutlineArrowDown />
        </span>
                </button>
              </th> */}
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {displayData
              ?.filter((entry) =>
                entry.username?.toLowerCase().includes(props.search)
              )
              .map((dataTerm) => createEntry(dataTerm))}
          </tbody>
        </table>
      </div>

      <div className="page-container">
        {pages.map((e) => {
          return (
            <span
              className={`page-number ${props.page === e ? "page-select" : ""}`}
              onClick={() => {
                props.pageChange(e);
              }}
            >
              {e}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default Table;
