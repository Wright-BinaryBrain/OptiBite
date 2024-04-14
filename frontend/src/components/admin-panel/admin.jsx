import React, { useState } from "react";
import AddProducts from "./addProducts";
import OrderPage from "./orderProducts";
import "./admin.css";

export default function Admin() {
  // State to manage which component is active
  const [activeComponent, setActiveComponent] = useState("addProducts");

  return (
    <div className="admin-container">
      {/* Sidebar for navigation */}
      <div className="admin-nav">
        <button
          className={activeComponent == "addProducts" ? "active-component" : ""}
          onClick={() => setActiveComponent("addProducts")}
        >
          Add Products
        </button>
        <button
          className={activeComponent == "addProducts" ? "" : "active-component"}
          onClick={() => setActiveComponent("orderProducts")}
        >
          Order Products
        </button>
      </div>

      {/* Main content area */}
      <div className="admin-content">
        {activeComponent === "addProducts" && <AddProducts />}
        {activeComponent === "orderProducts" && <OrderPage />}
      </div>
    </div>
  );
}
