import { useState, useContext, useEffect } from "react";
import OrderView from "./OrderView";
import axios from "axios";
// import { NavLink } from "react-router-dom";
// import { orderContext } from "../UserPageNav/orderContect/OrderContext";

const OrderItems = ({ orderitem, changeOrder, cancel }) => {
  const { _id, orderDate, productId } = orderitem;
  // const { pRate, pQty } = orderitems.oProducts;
  const [view, setView] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [allProducts, setAllProducts] = useState([]);

  // cancel order function

  // get all products
  useEffect(() => {
    console.log("cancel");
    axios
      .get(`https://backend.sabjiland.com/api/v1/getProducts`, {
        withCredentials: true,
      })
      .then((res) =>
        setAllProducts(res.data.data.map((item) => ({ ...item, quantity: 0 })))
      )
      .catch((err) => console.log("get Product err"));
  }, [orderitem]);

  // console.log(allProducts);
  useEffect(() => {
    //  console.log(allProducts);
    const filteredProducts = allProducts.filter((product) => {
      // console.log(product._id);
      // console.log(productId);
      return productId?.includes(product._id);
    });
    // console.log(filteredProducts);

    const updatedData = filteredProducts.map((product, index) => {
      // console.log(product);
      return {
        ...product,
        quantity: orderitem.quantity[index],
      };
    });

    let total = 0;

    // console.log(updatedData);
    for (const product of updatedData) {
      total += product.rate * product.quantity;
      // console.log(total);
    }
    setTotalPrice(total);
  }, [allProducts]);

  // const dataEntry = dataTerm;
  const dateStr = orderDate;
  const date = new Date(dateStr);
  // console.log(dataTerm);
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
  const View = () => {
    setView(!view);
  };

  return (
    <>
      <div className="user-page-order-item">
        <div className="user-page-order-product-details">
          <div className="user-page-order-product-name">
            <div className="user-page-order-titles">Order Id</div>
            <div className="user-page-order-details">{`: ${_id}`}</div>
          </div>
          <div className="user-page-order-product-name">
            <div className="user-page-order-titles">Order Date</div>
            <div className="user-page-order-details">{`: ${onlyDate}`}</div>
          </div>
          <div className="user-page-order-product-name">
            <div className="user-page-order-titles">Total Price</div>
            <div className="user-page-order-details">{`: ${totalPrice}`}</div>
          </div>

          {/* <div className="user-page-order-titles">
            <p>Order Id</p>
            <p>Order Date</p>
            <p>Total Price</p>
          </div>
          <div className="user-page-order-details">
            <p>: {_id}</p>
            <p>: {onlyDate}</p>
            <p>: {totalPrice}</p>
          </div> */}
        </div>
        <div className="user-page-order-product-action">
          {cancel ? (
            <div
              className="user-page-order-delete-btn"
              onClick={() => {
                changeOrder(_id);
              }}
            >
              <svg
                width="24"
                height="29"
                viewBox="0 0 24 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7.21936H5H21"
                  stroke="#FF3434"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 7.2194V24.0646C19 24.7028 18.7893 25.3149 18.4142 25.7662C18.0391 26.2175 17.5304 26.471 17 26.471H7C6.46957 26.471 5.96086 26.2175 5.58579 25.7662C5.21071 25.3149 5 24.7028 5 24.0646V7.2194M8 7.2194V4.81295C8 4.17472 8.21071 3.56262 8.58579 3.11133C8.96086 2.66003 9.46957 2.40649 10 2.40649H14C14.5304 2.40649 15.0391 2.66003 15.4142 3.11133C15.7893 3.56262 16 4.17472 16 4.81295V7.2194"
                  stroke="#FF3434"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 13.2355V20.4548"
                  stroke="#FF3434"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 13.2355V20.4548"
                  stroke="#FF3434"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Cancel Order</p>
            </div>
          ) : (
            ""
          )}

          {/* <NavLink to={`/view/${id}`} className="link"> */}
          <div className="user-page-order-view-btn" onClick={View}>
            View
          </div>
          {/* </NavLink> */}
        </div>
      </div>
      <OrderView
        orderitems={orderitem}
        setTotalPrice={setTotalPrice}
        totalPrice={`totalPrice`}
        View={View}
        id={_id}
        display={view}
      />
    </>
  );
};
export default OrderItems;
