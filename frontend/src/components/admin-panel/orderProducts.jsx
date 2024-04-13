import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "./orderTable";

const OrderPage = () => {
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

  const orderData = () => {
    return orders.map((order) => {
      const user = users.find((user) => user._id === order.userId) || {};
      const productDetails = order.productId.map((pid) => {
        const product = products.find((product) => product._id === pid) || {
          name: "Unknown",
        };
        return product.Name;
      });

      return {
        ...order,
        userName: user.name,
        productNames: productDetails.join(", "),
      };
    });
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/getAllOrder",
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
      const response = await axios.get(
        "http://localhost:4000/api/v1/getAllUser",
        {
          withCredentials: true,
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/getProducts",
        {
          withCredentials: true,
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/v1/updateOrder/${orderId}`,
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
        `http://localhost:4000/api/v1/deleteOrder/${orderId}`,
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
    <div className="order-admin-container">
      <OrderTable
        orders={orderDetails}
        onUpdateOrderStatus={updateOrderStatus}
        onDeleteOrder={deleteOrder}
      />
    </div>
  );
};

export default OrderPage;
