import React, { useState } from "react";
import axios from "axios";

function AddProducts() {
  const [productData, setProductData] = useState({
    Name: "",
    C_Type: "",
    Food_ID: "",
    Describe: "",
    vegNonVeg: "",
    Rate: "",
    Image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/postProduct",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);

      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(`Failed to add product: ${error.response.data.message}`);
      } else if (error.request) {
        console.log(error.request);
        alert("No response from the server. Please try again.");
      } else {
        alert("Error submitting form. Please try again.");
      }
    }
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form-container">
        <h2>Add New Product</h2>
        <div className="add-product-form">
          <label className="add-product-item">
            Name:
            <input
              className="add-product-input"
              type="text"
              name="Name"
              value={productData.Name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="add-product-item">
            Category Type:
            <input
              className="add-product-input"
              type="text"
              name="C_Type"
              value={productData.C_Type}
              onChange={handleChange}
            />
          </label>
          <label className="add-product-item">
            Food ID:
            <input
              className="add-product-input"
              type="number"
              name="Food_ID"
              value={productData.Food_ID}
              onChange={handleChange}
              required
            />
          </label>
          <label className="add-product-item">
            Image:
            <input
              className="add-product-input"
              type="text"
              name="Image"
              value={productData.Image}
              onChange={handleChange}
            />
          </label>
          <label className="add-product-item">
            Vegetarian:
            <select
              name="vegNonVeg"
              value={productData.vegNonVeg}
              onChange={handleChange}
              className="add-product-input"
            >
              <option value="">Select...</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-veg</option>
            </select>
          </label>
          <label className="add-product-item">
            Rate:
            <input
              className="add-product-input"
              type="text"
              name="Rate"
              value={productData.Rate}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label className="add-product-item" id="add-product-image">
          Description:
          <input
            className="add-product-input"
            type="text"
            name="Description"
            value={productData.Describe}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="add-product-button">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddProducts;
