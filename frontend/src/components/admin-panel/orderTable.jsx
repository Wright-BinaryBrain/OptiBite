import React from "react";

const OrderTable = ({ orders, onUpdateOrderStatus, onDeleteOrder }) => {
  return (
    <table className="order-admin-table">
      <thead id="order-admin-thead">
        <tr>
          <th>User Name</th>
          <th>Product Names</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="order-admin-tbody">
        {orders?.map((order) => (
          <tr key={order._id} className="order-table-rows">
            <td>{order.userName}</td>
            <td>{order.productNames}</td>
            <td>{order.quantity.join(", ")}</td>
            <td>{order.rates.join(", ")}</td>
            <td>{order.orderStatus}</td>
            <td>
              <button onClick={() => onUpdateOrderStatus(order._id, "Paid")}>
                Mark as Paid
              </button>
              <button
                onClick={() => onUpdateOrderStatus(order._id, "Cancelled")}
              >
                Cancel
              </button>
              <button onClick={() => onDeleteOrder(order._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
