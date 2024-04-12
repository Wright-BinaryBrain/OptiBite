import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "./orderTable";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/getAllOrder",
        {
          withCredentials: true,
        }
      );
      console.log("rr", response);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:4000/api/v1/updateOrder/${orderId}`, {
        status: newStatus,
        withCredentials: true,
      });
      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/deleteOrder/${orderId}`,
        {
          withCredentials: true,
        }
      );
      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <div>
      <OrderTable
        orders={orders}
        onUpdateOrderStatus={updateOrderStatus}
        onDeleteOrder={deleteOrder}
      />
    </div>
  );
};

export default OrderPage;
