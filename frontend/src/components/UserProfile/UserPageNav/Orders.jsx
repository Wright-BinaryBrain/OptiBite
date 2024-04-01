import { useContext, useEffect, useState } from "react";

import BeingDelivered from "../order/beingDelivered/BeingDelivered";
import Canceled from "../order/canceled/Canceled";
import Completed from "../order/completed/Completed";
import InProgress from "../order/inprogress/InProgress";
import Pending from "../order/pending/Pending";
// import { orderContext } from "./orderContect/OrderContext";
import { navContext } from "../NavContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [allOrderedItem, setAllOrderedItem] = useState([]);
  // const [userid, setUserid] = useState();

  const [cancel, setCancel] = useState(false);

  const cancelPendingOrder = (id) => {
    setCancel((prev) => !prev);
    console.log(id);
    axios
      .patch(
        `http://localhost:4000/api/v1/cancelOrder/${id}`,
        { orderStatus: "canceled" },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Your Order has been canceled", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOrders = () => {
    axios
      .get("http://localhost:4000/api/v1/getMyOrder", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setAllOrderedItem(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ******************************

  // useEffect(() => {
  //   console.log("user");

  //   axios
  //     .get(`http://localhost:4000/api/v1/whoami`,{
  //       withCredentials:true,
  //     })
  //     .then((res) => {
  //       setUserid(res.data.user._id);
  //     })
  //     .catch((err) => console.log(err));
  // }, [getOrders]);

  // useEffect(() => {
  //   console.log(userid);
  //   const filteredItems = allOrderedItem.filter((item) => item.userId === userid);
  // setOrderedItem(filteredItems);
  // }, [allOrderedItem,userid]);

  // const [OrderedItem, setOrderedItem] = useState([]);
  useEffect(() => {
    getOrders();
  }, [cancelPendingOrder]);

  // console.log(OrderedItem);

  // const { data } = useContext(orderContext);
  const { orderStatus, HandleRightPanel, HandleOrderStatus } =
    useContext(navContext);
  // console.log("orderPgae", orderStatus);

  // console.log("help", data);

  // const [orderStatuss, setOrderStatus] = useState("pending");
  // console.log(orderStatus);

  return (
    <>
      <div className="order-main-box">
        <div className="user-page-right-top-bar">
          <img
            src="https://i.postimg.cc/pT65LyC9/sabji-land-logo-1.png"
            alt="logo"
          />
          <p className="user-page-right-title">Orders</p>
        </div>
        <p className="user-page-edit-profile-title">My Orders</p>
        <div className="user-page-order-status-container">
          <div className="order-select-option">
            <select
              name="orderStatus"
              id="orderStatus"
              onChange={(e) => HandleRightPanel("orders", e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Proceess</option>
              <option value="beingDelivered">Being Delivered</option>
              <option value="completed">Completed</option>
              <option value="canceled">Cancelled</option>
            </select>
          </div>
          <div className="user-page-orders-container">
            <div className="user-page-order-status">
              <div
                className={`user-page-order-pending ${
                  orderStatus === "pending" || orderStatus === ""
                    ? "user-page-order-status-active"
                    : ""
                }`}
                onClick={() => HandleRightPanel("orders", "pending")}
              >
                Pending
              </div>
              <div
                className={`user-page-order-inprogress ${
                  orderStatus === "inprogress"
                    ? "user-page-order-status-active"
                    : ""
                }`}
                onClick={() => HandleRightPanel("orders", "inprogress")}
              >
                In-Process
              </div>
              <div
                className={`user-page-order-beingDelivered ${
                  orderStatus === "beingDelivered"
                    ? "user-page-order-status-active"
                    : ""
                }`}
                onClick={() => HandleRightPanel("orders", "beingDelivered")}
              >
                Being Delivered
              </div>
              <div
                className={`user-page-order-completed ${
                  orderStatus === "completed"
                    ? "user-page-order-status-active"
                    : ""
                }`}
                onClick={() => HandleRightPanel("orders", "completed")}
              >
                Completed
              </div>
              <div
                className={`user-page-order-canceled ${
                  orderStatus === "canceled"
                    ? "user-page-order-status-active"
                    : ""
                }`}
                onClick={() => HandleRightPanel("orders", "canceled")}
              >
                Canceled
              </div>
            </div>
            <div className="user-page-order-main-content">
              {(() => {
                switch (orderStatus) {
                  case "pending":
                    return (
                      <Pending
                        OrderedItem={allOrderedItem}
                        changeOrder={cancelPendingOrder}
                      />
                    );
                    break;
                  case "inprogress":
                    return <InProgress OrderedItem={allOrderedItem} />;
                    break;
                  case "beingDelivered":
                    return <BeingDelivered OrderedItem={allOrderedItem} />;
                    break;
                  case "completed":
                    return <Completed OrderedItem={allOrderedItem} />;
                    break;
                  case "canceled":
                    return <Canceled OrderedItem={allOrderedItem} />;
                    break;
                  default:
                    return <Pending OrderedItem={allOrderedItem} />;
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Orders;
