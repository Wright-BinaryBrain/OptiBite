import React from "react";
import AddProducts from "./addProducts";
import "./admin.css";
import OrderPage from "./orderProducts";
export default function Admin() {
  return (
    <div className="admin-container">
      <AddProducts />
      <OrderPage />
    </div>
  );
}
