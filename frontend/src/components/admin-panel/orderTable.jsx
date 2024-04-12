import React from "react";

const OrderTable = ({ orders, onUpdateOrderStatus, onDeleteOrder }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.productId.join(", ")}</td>
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
