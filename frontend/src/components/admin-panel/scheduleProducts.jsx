import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "./orderTable";

const ScheduleProducts = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchProducts();
  }, []);

  useEffect(() => {
    setOrderDetails(orderData());
  }, [orders, users, products]);

  console.log(orderDetails);
  const orderData = () => {
    return orders.map((order) => {
      const user = users.find((user) => user._id === order.userId) || {
        name: "Unknown User",
      };
      let orderTotal = 0; // Variable to store the total price of the order

      const productDetails = order.productId.map((pid, index) => {
        const product = products.find((p) => p._id === pid) || {
          name: "Unknown",
          price: 0,
        };
        const quantity = order.quantity[index] || 0;
        const rate = order.rates[index] || product.price; // Use rate if available, otherwise fall back to product price
        const productTotal = rate * quantity;
        orderTotal += productTotal; // Adding to the total price of the order

        return {
          name: product.Name,
          quantity: quantity,
          totalPrice: productTotal,
        };
      });

      return {
        ...order,
        userName: user.name,
        productDetails: productDetails,
        totalPrice: orderTotal,
      };
    });
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1/api/v1/getAllScheduledOrders",
        {
          withCredentials: true,
        }
      );
      console.log("Orders fetched", response);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1/api/v1/getAllUser", {
        withCredentials: true,
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  const schedule = true;
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1/api/v1/getProducts", {
        withCredentials: true,
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://127.0.0.1/api/v1/updateScheduledOrder/${orderId}`,
        { orderStatus: newStatus },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `http://127.0.0.1/api/v1/deleteScheduledOrder/${orderId}`,
        {
          withCredentials: true,
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <OrderTable
      orderDetails={orderDetails}
      updateOrderStatus={updateOrderStatus}
      schedule={schedule}
      deleteOrder={deleteOrder}
    />
  );
};

export default ScheduleProducts;
