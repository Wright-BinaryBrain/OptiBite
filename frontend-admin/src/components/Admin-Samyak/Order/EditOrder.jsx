import React, { useDeferredValue, useEffect, useState } from "react";
import "./addOrder.css";
import axios from "../Axios";
import Input from "./Input";

function OrderEdit(props) {
  const [orderData, setOrderData] = useState([]);
  const [userId, setUserId] = useState("");
  const [riderId, setRiderId] = useState("");
  const [userData, setUserData] = useState([]);
  const [riderData, setRiderData] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [displayD, setDisplayD] = useState({
    userName: "",
    gName: "",
    gContact: "",
    gAddress: "",
    paymentM: "",
    paymentS: "",
    orderS: "",
    riderName: "",
  });

  const [postData, setPostData] = useState({});

  // const [reload, setReload] = useState(true);

  useEffect(() => {
    if (props.id !== "") {
      axios
        .get(`https://backend.sabjiland.com/api/v1/getOrder/${props.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setOrderData(res.data.data);
          setUserId(res.data.data.userId);
          setRiderId(res.data.data.riderId);

          if (res.data.data.guestName) {
            setDisplayD((prevV) => {
              return {
                ...prevV,
                gName: res.data.data.guestName,
                gContact: res.data.data.guestContact,
                gAddress: res.data.data.orderAddress,
                paymentM: res.data.data.paymentMethod,
                paymentS: res.data.data.paymentStatus,
                orderS: res.data.data.orderStatus,
              };
            });
          } else {
            setDisplayD((prevV) => {
              return {
                ...prevV,
                paymentM: res.data.data.paymentMethod,
                paymentS: res.data.data.paymentStatus,
                orderS: res.data.data.orderStatus,
              };
            });
          }
        })
        .catch((err) => console.log(err));
    }
    axios
      .get(`https://backend.sabjiland.com/api/v1/getAllUser`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res)
        setUserData(res.data.data.filter((user) => user.role === "customer"));
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://backend.sabjiland.com/api/v1/getAllRider`, {
        withCredentials: true,
      })
      .then((res) => {
        setRiderData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [props.showAdd]);

  useEffect(() => {
    if (orderData !== []) {
      axios
        .get(`https://backend.sabjiland.com/api/v1/getProducts`, {
          withCredentials: true,
        })
        .then((res) => {
          const allProduct = res.data.data;
          const extractedQty = orderData.quantity;

          const filteredData = allProduct.filter((product) => {
            return orderData.productId.includes(product._id);
          });

          const updatedData = filteredData.map((product, index) => {
            return {
              ...product,
              quantity: extractedQty[index],
            };
          });

          setFilteredProducts(updatedData);
        })
        .catch((err) => console.log(err));
    }
  }, [orderData]);

  useEffect(() => {
    if (riderId !== "") {
      axios
        .get(`https://backend.sabjiland.com/api/v1/getRider/${riderId}`)
        .then((res) => {
          setDisplayD((prevV) => {
            return {
              ...prevV,
              riderName: res.data.data.riderName,
            };
          });
        })
        .catch((err) => console.log(err));
    }
  }, [riderId]);

  useEffect(() => {
    if (userId !== "") {
      axios
        .get(`https://backend.sabjiland.com/api/v1/getUser/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data.data);
          setDisplayD((prevV) => {
            return {
              ...prevV,
              userName: res.data.data.name,
            };
          });
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  useEffect(() => {
    axios
      .get(`https://backend.sabjiland.com/api/v1/getProducts`, {
        params: {
          keyword: search,
        },
        withCredentials: true,
      })
      .then((res) => setSearchedProducts(res.data.data))
      .catch((err) => console.log(err.message));
  }, [search]);

  function handleInput(event) {
    const { name, value } = event.target;

    setDisplayD((prevV) => {
      return {
        ...prevV,
        [name]: value,
      };
    });
  }

  function addProduct(id) {
    const existingProduct = filteredProducts.find((item) => item._id === id);

    if (existingProduct) {
      setFilteredProducts((prevD) => {
        return prevD.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      });
    } else {
      const newProduct = searchedProducts.find((item) => item._id === id);

      if (newProduct) {
        setFilteredProducts((prevD) => [
          ...prevD,
          { ...newProduct, quantity: 1 },
        ]);
      }
    }
    setSearch("");
  }

  function MinusQty(e, id) {
    e.preventDefault();
    setFilteredProducts((prevD) => {
      return prevD.map((item) => {
        if (item._id === id && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 0.5,
          };
        }
        return item;
      });
    });
  }

  function PlusQty(e, id) {
    e.preventDefault();
    setFilteredProducts((prevD) => {
      return prevD.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity + 0.5,
          };
        }
        return item;
      });
    });
  }

  function DeleteId(e, id) {
    e.preventDefault();
    const deleteProduct = filteredProducts.filter((prod) => {
      return prod._id !== id;
    });
    setFilteredProducts(deleteProduct);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const ridername = displayD.riderName;
    const postRiderData = riderData.filter((rider) => {
      return rider.riderName === ridername;
    });
    const postRiderId = postRiderData.map((rdata) => {
      return rdata._id;
    });

    const productIds = filteredProducts.map((product) => product._id);
    const pQuantities = filteredProducts.map((product) => product.quantity);

    if (displayD.userName !== "") {
      const username = displayD.userName;
      const postUserData = userData.filter((user) => {
        return user.name === username;
      });
      const postUserId = postUserData.map((udata) => {
        return udata._id;
      });
      const postAddresss = postUserData.map((udata) => {
        return udata.address;
      });
      const postAddress = postAddresss[0];

      setPostData({
        userId: postUserId,
        orderAddress: postAddress,
        paymentMethod: displayD.paymentM,
        paymentStatus: displayD.paymentS,
        orderStatus: displayD.orderS,
        riderId: postRiderId,
        productId: productIds,
        quantity: pQuantities,
      });
    } else {
      setPostData({
        guestName: displayD.gName,
        guestContact: displayD.gContact,
        orderAddress: displayD.gAddress,
        paymentMethod: displayD.paymentM,
        paymentStatus: displayD.paymentS,
        orderStatus: displayD.orderS,
        riderId: postRiderId,
        productId: productIds,
        quantity: pQuantities,
      });
    }
  }

  useEffect(() => {
    if (postData.riderId) {
      axios
        .patch(
          `https://backend.sabjiland.com/api/v1/updateOrder/${props.id}`,
          postData,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          CloseEdit();
          props.RefreshC();
          props.triggerSuccess({ method: "put", state: true });
        })
        .catch((err) => console.log(err));
    }
  }, [handleSubmit]);

  function CloseEdit() {
    setDisplayD({
      userName: "",
      gName: "",
      gContact: "",
      gAddress: "",
      paymentM: "",
      paymentS: "",
      orderS: "",
      riderName: "",
    });
    setUserId("");
    setRiderId("");
    setPostData({});
    setFilteredProducts([]);

    props.showAdd();

    // props.setId("");
  }

  useEffect(() => {
    console.log(filteredProducts);
  }, [filteredProducts]);

  return (
    <div
      className="pop-container"
      style={props.pop ? { display: "block" } : { display: "none" }}
    >
      <div className="product-item">
        {/* <div className="product-top"> */}
        <div className="heading">Edit Order</div>
        <div className="close-btn">
          <button onClick={CloseEdit}>
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
        {/* </div> */}

        <div className="product-content">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <label>
                Username <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={displayD.userName}
                onChange={handleInput}
                name="userName"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {userData.map((odata) => {
                  return (
                    <option key={odata._id} value={odata.name}>
                      {odata.name}
                    </option>
                  );
                })}
              </select>
              <label>Guest Name</label>
              <input
                type="text"
                onChange={handleInput}
                name="gName"
                value={displayD.gName}
              ></input>
              <label>Guest Contact</label>
              <input
                type="text"
                onChange={handleInput}
                name="gContact"
                value={displayD.gContact}
              ></input>
              <label>Guest Address</label>
              <input
                type="text"
                onChange={handleInput}
                name="gAddress"
                value={displayD.gAddress}
              ></input>
              <label>
                Payment Method <span style={{ color: "red" }}>*</span>
              </label>
              <select
                onChange={handleInput}
                value={displayD.paymentM}
                name="paymentM"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option>COD</option>
                <option>Esewa</option>
                <option>Khalti</option>
                <option>Phone pay</option>
              </select>
              <label>
                Order Status <span style={{ color: "red" }}>*</span>
              </label>
              <select
                onChange={handleInput}
                value={displayD.orderS}
                name="orderS"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option>Completed</option>
                <option>Being delivered</option>
                <option>In process</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <label>
                Payment Status <span style={{ color: "red" }}>*</span>
              </label>
              <select
                onChange={handleInput}
                value={displayD.paymentS}
                name="paymentS"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option>Paid</option>
                <option>Unpaid</option>
              </select>
              <label>
                Rider <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={displayD.riderName}
                onChange={handleInput}
                name="riderName"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {riderData.map((name) => {
                  return (
                    <option key={name._id} value={name.riderName}>
                      {name.riderName}
                    </option>
                  );
                })}
              </select>

              <div className="save-button">
                <button onClick={handleSubmit}>Save</button>
              </div>
            </div>
            <div className="right">
              <label>
                Product <span style={{ color: "red" }}>*</span>
              </label>
              <div className="search-add">
                <div className="search-product">
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Product"
                  />
                </div>
                <div
                  className="search-drop"
                  style={search ? { display: "block" } : { display: "none" }}
                >
                  {searchedProducts.map((dataT) => {
                    return (
                      <div
                        key={dataT._id}
                        className="droprow"
                        onClick={() => addProduct(dataT._id)}
                      >
                        {dataT.productName}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="product-table">
                <table>
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((dataT) => {
                      console.log(dataT);
                      return (
                        <>
                          <tr key={dataT._id}>
                            <td>
                              <img
                                src={`https://backend.sabjiland.com/uploads/${dataT.image[0]}`}
                                alt=""
                                height="100px"
                                width="100px"
                              />
                            </td>
                            <td>
                              <div className="desc-col">
                                <div>{dataT.productName}</div>
                                <div>{dataT.stock}</div>
                              </div>
                            </td>
                            <td>Rs. {dataT.rate}</td>
                            <td>
                              <div className="qty-col">
                                <button
                                  className="mbtn"
                                  onClick={(e) => MinusQty(e, dataT._id)}
                                >
                                  -
                                </button>
                                <span>{dataT.quantity}</span>
                                <button
                                  className="pbtn"
                                  onClick={(e) => PlusQty(e, dataT._id)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td>Rs. {dataT.rate * dataT.quantity}</td>
                            <td className="trashcan">
                              <button onClick={(e) => DeleteId(e, dataT._id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="none"
                                >
                                  <path
                                    stroke="#FF3434"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3.984 6.133h18M19.984 6.133v14a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-14m3 0v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10.984 11.133v6M14.984 11.133v6"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderEdit;
