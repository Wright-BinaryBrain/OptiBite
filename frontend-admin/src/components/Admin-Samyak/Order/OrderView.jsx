// import React, { useState, useEffect } from "react";
// import data from "./ViewData.js";
// import "./View.css";
// import axios from "../Axios.jsx";

// function OrderView(props) {
//   const [subTotal, setSubTotalPrice] = useState();
//   const [total, setTotal] = useState();
//   const [products, setProducts] = useState();
//   const [rider, setRider] = useState([]);
//   const riderId = props.delivered;
//   console.log(props.oProducts);
//   console.log(props.orderA);
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         `https://backend.sabjiland.com/api/v1/searchProducts`
//       );
//       setProducts(response.data.data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [props.oProducts]);

//   useEffect(() => {
//     axios
//       .get(`https://backend.sabjiland.com/api/v1/getAllRider?keyword=`)
//       .then((res) => setRider(res.data.data))
//       .catch((err) => console.log(err.message));
//   }, [props.delivered]);

//   const productData = products?.filter((product) =>
//     props.oProducts?.some((entity) => entity === product._id)
//   );

//   const riderData = rider?.filter((entity) => entity._id === props.delivered);

//   console.log(rider);
//   console.log(riderId);

//   useEffect(() => {
//     let updatedPrice = productData?.reduce((totalPrice, curElem, index) => {
//       console.log(index);
//       let { rate } = curElem;
//       totalPrice = totalPrice + rate * props.orderA[index];
//       return totalPrice;
//     }, 0);

//     setSubTotalPrice(updatedPrice);
//     if (props.dCharge === undefined) {
//       setTotal(updatedPrice + 0);
//     } else {
//       setTotal(updatedPrice + props.dCharge);
//     }
//   }, [props.oProducts]);

//   return (
//     <div
//       className="Vpop-container"
//       style={props.vPop ? { display: "block" } : { display: "none" }}
//     >
//       <div className="view-content">
//         <div className="logo-view">
//           <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
//         </div>
//         <div className="close-button">
//           <button onClick={props.showView}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="22"
//               height="22"
//               fill="none"
//             >
//               <path
//                 fill="#777"
//                 d="M11 .5C5.15.5.5 5.15.5 11S5.15 21.5 11 21.5 21.5 16.85 21.5 11 16.85.5 11 .5Zm4.05 15.75L11 12.2l-4.05 4.05-1.2-1.2L9.8 11 5.75 6.95l1.2-1.2L11 9.8l4.05-4.05 1.2 1.2L12.2 11l4.05 4.05-1.2 1.2Z"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="heading">Invoice</div>
//         <div className="detail-container">
//           <div className="left-details">
//             <div className="title-container">
//               <div className="title">Order ID</div>
//               <div className="title">Receiver's Name</div>
//               <div className="title gap">Email</div>
//               <div className="title">Order Date</div>
//               <div className="title">Order Status</div>
//               <div className="title">Order Amount</div>
//             </div>
//             <div className="data-container">
//               <div className="data">: {props.id}</div>
//               <div className="data">: {props.name}</div>
//               <div className="data gap">: {props.email}</div>
//               <div className="data">: {props.date}</div>
//               <div className="data">: {props.orderS}</div>
//               <div className="data">
//                 :{" "}
//                 {props.orderA?.reduce(
//                   (accumulator, currentValue) => accumulator + currentValue
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="right-details">
//             <div className="title-container">
//               <div className="title">Contact</div>
//               <div className="title">Address</div>
//               <div className="title gap">Delivered by</div>
//               <div className="title">Payment Date</div>
//               <div className="title">Payment Status</div>
//               <div className="title">Payment Method</div>
//             </div>
//             <div className="data-container">
//               <div className="data">: {props.contact}</div>
//               <div className="data">: {props.address}</div>
//               <div className="data gap">
//                 :{" "}
//                 {riderData.map((e) => {
//                   return e.riderName;
//                 })}
//               </div>
//               <div className="data">: {props.pDate}</div>
//               <div className="data">: {props.pStatus}</div>
//               <div className="data">: {props.pMethod}</div>
//             </div>
//           </div>
//         </div>
//         <div className="invoice-table">
//           <table>
//             <thead>
//               <tr>
//                 <th style={{ textAlign: "left", paddingLeft: "20px" }}>
//                   Product Name
//                 </th>
//                 <th>Rate</th>
//                 <th>Qty</th>
//                 <th style={{ borderRight: "none" }}>Amount</th>
//               </tr>
//             </thead>

//             <tbody>
//               {productData?.map((oP, index) => {
//                 const { id, productName, rate, pQty } = oP;
//                 console.log(oP);

//                 const amount = rate * props.orderA[index];
//                 return (
//                   <tr key={index}>
//                     <td style={{ textAlign: "left", paddingLeft: "20px" }}>
//                       {productName}
//                     </td>
//                     <td>{rate}</td>
//                     <td>{props.orderA[index]}</td>
//                     <td>{amount}</td>
//                   </tr>
//                 );
//               })}
//               <tr>
//                 <td colSpan={2}></td>
//                 <td>SubTotal</td>
//                 <td>{subTotal}</td>
//               </tr>
//               <tr>
//                 <td colSpan={2}></td>
//                 <td>
//                   Delivery
//                   <br />
//                   Charge
//                 </td>
//                 <td>{props.dCharge === undefined ? 0 : props.dCharge}</td>
//               </tr>
//               <tr>
//                 <td colSpan={2}></td>
//                 <td style={{ fontWeight: "bold" }}>Total</td>
//                 <td>{total}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderView;

import React, { useState, useEffect } from "react";
import "./View.css";
import axios from "../Axios.jsx";

// function OrderView(props) {
//   const [orderData, setOrderData] = useState([]);
//   const [subTotal, setSubTotalPrice] = useState();
//   const [total, setTotal] = useState();

//   const [userId, setUserId] = useState("");
//   const [riderId, setRiderId] = useState("");
//   const [reload, setReload] = useState(true);
//   const [reload2, setReload2] = useState(true);

//   const [productIds, setProductIds] = useState([1]);
//   const [quantities, setQuantities] = useState([]);
//   const [userData, setUserData] = useState([]);
//   const [riderData, setRiderData] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [receiver, setReceiver] = useState({
//     name: "",
//     contact: "",
//     address: "",
//   });

//   useEffect(() => {
//     let total = 0;

//     for (const product of filteredData) {
//       total += product.rate * product.quantity;
//     }

//     setSubTotalPrice(total);
//     setTotal(total + 500);
//   }, [filteredData]);

//   useEffect(() => {
//     axios
//       .get(`https://backend.sabjiland.com/api/v1/getOrder/${props.id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         console.log(res);
//         setOrderData(res.data.data);
//         if (res.data.data.guestName != "") {
//           console.log("user");
//         } else {
//         }
//       })
//       .catch((err) => console.log(err));
//   }, [props.id]);

//   // console.log(orderData);

//   useEffect(() => {
//     setUserId(orderData.userId);
//     setRiderId(orderData.riderId);
//     setProductIds(orderData.productId);
//     setQuantities(orderData.quantity);

//     console.log(productIds);
//     console.log(quantities);
//   }, [orderData]);

//   useEffect(() => {
//     axios
//       .get(`https://backend.sabjiland.com/api/v1/getUser/${userId}`, {
//         withCredentials: true,
//       })
//       .then((res) => setUserData(res.data.data))
//       .catch((err) => console.log(err));
//   }, [userId]);

//   useEffect(() => {
//     axios
//       .get(`https://backend.sabjiland.com/api/v1/getRider/${riderId}`, {
//         withCredentials: true,
//       })
//       .then((res) => setRiderData(res.data.data))
//       .catch((err) => console.log(err));
//   }, [riderId]);

//   useEffect(() => {
//     axios
//       .get(`https://backend.sabjiland.com/api/v1/getProducts`, {
//         withCredentials: true,
//       })
//       .then((res) =>
//         setAllProducts(res.data.data.map((item) => ({ ...item, quantity: 0 })))
//       )
//       .catch((err) => console.log(err));
//   }, [props.id]);

//   // console.log("allproducts", allProducts);

//   useEffect(() => {
//     setReload((prev) => !prev);
//   }, [allProducts]);

//   useEffect(() => {
//     // console.log("refreshed");
//     const allProduct = allProducts;
//     console.log(allProduct);
//     const filteredProducts = allProduct.filter((product) =>
//       productIds?.includes(product._id)
//     );
//     setFilteredData(filteredProducts);

//     console.log(filteredProducts);
//     const updatedData = filteredProducts.map((product, index) => {
//       return {
//         ...product,
//         quantity: quantities[index],
//       };
//     });
//     console.log(updatedData);
//     setFilteredData(updatedData);
//     console.log("f", filteredData);
//   }, [reload]);
//   // console.log(filteredData);

//   useState(() => {
//     setReload2((prev) => !prev);
//   }, [userData]);
//   console.log(orderData);

//   useEffect(() => {
//     console.log(props.id);
//     console.log(orderData);
//     if (orderData) {
//       if (orderData.guestName != "") {
//         console.log(orderData);
//         setReceiver({
//           name: orderData.guestName,
//           contact: orderData.guestName,
//         });
//         console.log(` rec: ${JSON.stringify(receiver)}`);
//       }
//     }
//   }, [props.id]);

//   return (
//     <div
//       className="Vpop-container"
//       style={props.vPop ? { display: "block" } : { display: "none" }}
//     >
//       <div className="view-content">
//         <div className="logo-view">
//           <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
//         </div>
//         <div className="close-button">
//           <button onClick={props.showView}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="22"
//               height="22"
//               fill="none"
//             >
//               <path
//                 fill="#777"
//                 d="M11 .5C5.15.5.5 5.15.5 11S5.15 21.5 11 21.5 21.5 16.85 21.5 11 16.85.5 11 .5Zm4.05 15.75L11 12.2l-4.05 4.05-1.2-1.2L9.8 11 5.75 6.95l1.2-1.2L11 9.8l4.05-4.05 1.2 1.2L12.2 11l4.05 4.05-1.2 1.2Z"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="heading">Invoice</div>
//         <div className="detail-container">
//           <div className="left-details">
//             <div className="title-container">
//               <div className="title">Order ID</div>
//               <div className="title">Receiver's Name</div>
//               <div className="title gap">Email</div>
//               <div className="title">Order Date</div>
//               <div className="title">Order Status</div>
//               <div className="title">Order Amount</div>
//             </div>
//             <div className="data-container">
//               <div className="data">: {orderData._id}</div>
//               <div className="data">: {receiver.name}</div>
//               <div className="data gap">: {userData.email}</div>
//               <div className="data">: {orderData.orderDate}</div>
//               <div className="data">: {orderData.orderStatus}</div>
//               <div className="data">
//                 :{" "}
//                 {orderData.quantity?.reduce(
//                   (accumulator, currentValue) => accumulator + currentValue
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="right-details">
//             <div className="title-container">
//               <div className="title">Contact</div>
//               <div className="title">Address</div>
//               <div className="title gap">Delivered by</div>
//               <div className="title">Payment Date</div>
//               <div className="title">Payment Status</div>
//               <div className="title">Payment Method</div>
//             </div>
//             <div className="data-container">
//               <div className="data">: {receiver.contact}</div>
//               <div className="data">: {orderData.orderAddress}</div>
//               <div className="data gap">: {riderData.riderName} </div>
//               <div className="data">: ? </div>
//               <div className="data">: {orderData.paymentStatus}</div>
//               <div className="data">: {orderData.paymentMethod}</div>
//             </div>
//           </div>
//         </div>
//         <div className="invoice-table">
//           <table>
//             <thead>
//               <tr>
//                 <th style={{ textAlign: "left", paddingLeft: "20px" }}>
//                   Product Name
//                 </th>
//                 <th>Rate</th>
//                 <th>Qty</th>
//                 <th style={{ borderRight: "none" }}>Amount</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredData.map((oP, index) => {
//                 const amount = oP.rate * oP.quantity;
//                 return (
//                   <tr key={index}>
//                     <td style={{ textAlign: "left", paddingLeft: "20px" }}>
//                       {oP.productName}
//                     </td>
//                     <td>{oP.rate}</td>
//                     <td>{oP.quantity}</td>
//                     <td>{amount}</td>
//                   </tr>
//                 );
//               })}

//               <tr>
//                 <td colSpan={2}></td>
//                 <td>SubTotal</td>
//                 <td>{subTotal}</td>
//               </tr>
//               <tr>
//                 <td colSpan={2}></td>
//                 <td>
//                   Delivery
//                   <br />
//                   Charge
//                 </td>
//                 <td>500</td>
//               </tr>
//               <tr>
//                 <td colSpan={2}></td>
//                 <td style={{ fontWeight: "bold" }}>Total</td>
//                 <td>{total}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

function OrderView(props) {
  const [orderData, setOrderData] = useState([]);
  const [subTotal, setSubTotalPrice] = useState();
  const [total, setTotal] = useState();
  const [productIds, setProductIds] = useState([1]);
  const [quantities, setQuantities] = useState([]);
  const [userId, setUserId] = useState("");
  const [riderId, setRiderId] = useState("");

  const [userData, setUserData] = useState([]);
  const [riderData, setRiderData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [receiver, setReceiver] = useState({
    name: "",
    contact: "",
  });
  useEffect(() => {
    axios
      .get(`https://backend.sabjiland.com/api/v1/getOrder/${props.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        const data = res.data.data;
        setOrderData(data);
        setRiderId(data.riderId);
        setProductIds(data.productId);
        setUserId(data.userId);
        setQuantities(data.quantity);
        if (res.data.data.guestName != "") {
          setReceiver({ name: data.guestName, contact: data.guestContact });
        } else {
        }
      })
      .catch((err) => console.log(err));
  }, [props.id]);
  useEffect(() => {
    console.log("user");
   
      axios
        .get(`https://backend.sabjiland.com/api/v1/getUser/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) => console.log(err));
    
  }, [userId]);

  useEffect(() => {
    axios
      .get(`https://backend.sabjiland.com/api/v1/getRider/${riderId}`, {
        withCredentials: true,
      })
      .then((res) => setRiderData(res.data.data))
      .catch((err) => console.log(err));
  }, [riderId]);

  useEffect(() => {
    axios
      .get(`https://backend.sabjiland.com/api/v1/getProducts`, {
        withCredentials: true,
      })
      .then((res) =>
        setAllProducts(res.data.data.map((item) => ({ ...item, quantity: 0 })))
      )
      .catch((err) => console.log(err));
  }, [props.id]);

  useEffect(() => {
    // console.log("refreshed");
    const allProduct = allProducts;
    console.log(allProduct);
    console.log(productIds);
    const filteredProducts = allProduct.filter((product) =>
      productIds?.includes(product._id)
    );
    setFilteredData(filteredProducts);

    console.log(filteredProducts);
    const updatedData = filteredProducts.map((product, index) => {
      return {
        ...product,
        quantity: quantities[index],
      };
    });
    console.log(updatedData);
    setFilteredData(updatedData);
    console.log("f", filteredData);
  }, [orderData]);

  useEffect(() => {
    let total = 0;

    for (const product of filteredData) {
      total += product.rate * product.quantity;
    }

    setSubTotalPrice(total);
    setTotal(total + 500);
  }, [filteredData]);

  console.log(userData);

  const dateStr = orderData.orderDate;
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

  return (
    <>
      <div
        className="Vpop-container"
        style={props.vPop ? { display: "block" } : { display: "none" }}
      >
        <div className="view-content">
          <div className="logo-view">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
          </div>
          <div className="close-button">
            <button
              onClick={() => {
                props.showView();
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
          <div className="heading">Invoice</div>
          <div className="detail-container">
            <div className="left-details">
              <div className="title-container">
                <div className="title">Order ID</div>
                <div className="title">Receiver's Name</div>
                <div className="title gap">Email</div>
                <div className="title">Order Date</div>
                <div className="title">Order Status</div>
                <div className="title">Order Amount</div>
              </div>
              <div className="data-container">
                <div className="data">: {orderData._id}</div>
                <div className="data">
                  : {receiver.name ? receiver.name : userData.name}
                </div>
                <div className="data gap">
                  : {userData.email ? userData.email : ""}
                </div>
                <div className="data">: {nepalTime}</div>
                <div className="data">: {orderData.orderStatus}</div>
                <div className="data">
                  :{" "}
                  {orderData.quantity?.reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
                </div>
              </div>
            </div>
            <div className="right-details">
              <div className="title-container">
                <div className="title">Contact</div>
                <div className="title">Address</div>
                <div className="title gap">Delivered by</div>
                <div className="title">Payment Date</div>
                <div className="title">Payment Status</div>
                <div className="title">Payment Method</div>
              </div>
              <div className="data-container">
                <div className="data">
                  : {receiver.contact ? receiver.contact : userData.contactNo1}
                </div>
                <div className="data">: {orderData.orderAddress}</div>
                <div className="data gap">: {riderData.riderName} </div>
                <div className="data">: ? </div>
                <div className="data">: {orderData.paymentStatus}</div>
                <div className="data">: {orderData.paymentMethod}</div>
              </div>
            </div>
          </div>
          <div className="invoice-table">
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", paddingLeft: "20px" }}>
                    Product Name
                  </th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th style={{ borderRight: "none" }}>Amount</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((oP, index) => {
                  const amount = oP.rate * oP.quantity;
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                        {oP.productName}
                      </td>
                      <td>{oP.rate}</td>
                      <td>{oP.quantity}</td>
                      <td>{amount}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan={2}></td>
                  <td>SubTotal</td>
                  <td>{subTotal}</td>
                </tr>
                <tr>
                  <td colSpan={2}></td>
                  <td>
                    Delivery
                    <br />
                    Charge
                  </td>
                  <td>500</td>
                </tr>
                <tr>
                  <td colSpan={2}></td>
                  <td style={{ fontWeight: "bold" }}>Total</td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderView;
