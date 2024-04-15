import React from "react";

const OrderTable = ({
  orderDetails,
  updateOrderStatus,
  deleteOrder,
  schedule,
}) => {
  console.log(orderDetails);
  return (
    <div className="order-admin-container">
      {orderDetails?.map((order) => (
        <div className="admin-order-item" key={order._id}>
          <div className="admin-order-product-details">
            <div className="admin-order-product-name">
              <div className="admin-order-titles">Order Id</div>
              <div className="admin-order-details">{`: ${order._id}`}</div>
            </div>
            <div className="admin-order-product-name">
              <div className="admin-order-titles">Order Date</div>
              <div className="admin-order-details">{`: ${new Date(
                order.createdAt
              ).toLocaleDateString()}`}</div>
            </div>
            <div className="admin-order-product-name">
              <div className="admin-order-titles">Total Price</div>
              <div className="admin-order-details">{`: $${order.totalPrice}`}</div>
            </div>
            <div className="admin-order-product-name">
              <div className="admin-order-titles">Address</div>
              <div className="admin-order-details">{`: ${order.orderAddress}`}</div>
            </div>
            <div className="admin-order-product-name">
              <div className="admin-order-titles">Status</div>
              <div className="admin-order-details">{`: ${order.orderStatus}`}</div>
            </div>
          </div>
          {schedule ? (
            <div className="admin-schedule-item">
              <div className="admin-order-product-name">
                <div className="admin-order-titles">Start Date</div>
                <div className="admin-order-details">{`: ${new Date(
                  order.startDate
                ).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                })}`}</div>
              </div>
              <div className="admin-order-product-name">
                <div className="admin-order-titles">End Date</div>
                <div className="admin-order-details">{`: ${new Date(
                  order.endDate
                ).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                })}`}</div>
              </div>
              <div className="admin-order-product-name">
                <div className="admin-order-titles">Time</div>
                <div className="admin-order-details">{`: ${order.timeOfDelivery}`}</div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="admin-order-product-container">
            <div className="admin-order-product-titles">Products</div>
            <div className="order-product-details">
              {order.productDetails?.map((prod) => (
                <div className="order-product-subdetails" key={prod.name}>
                  <span className="subdetails-name">
                    <b>Name: </b>
                    {prod.name}
                  </span>
                  <span className="subdetails-quantity">
                    <b>Quantity:</b> {prod.quantity}
                  </span>
                  <span>
                    <b>Rate:</b> ${prod.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="admin-order-product-action">
            <button
              onClick={() => updateOrderStatus(order._id, "Completed")}
              className="order-button-start"
            >
              Paid
            </button>
            <button
              onClick={() => updateOrderStatus(order._id, "Cancelled")}
              className="order-button-cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteOrder(order._id)}
              className="order-button-delete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTable;
