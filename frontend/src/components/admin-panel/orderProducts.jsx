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
            <button onClick={() => updateOrderStatus(order._id, "Paid")}>
              Mark as Paid
            </button>
            <button onClick={() => updateOrderStatus(order._id, "Cancelled")}>
              Cancel Order
            </button>
            <button onClick={() => deleteOrder(order._id)}>Delete Order</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
