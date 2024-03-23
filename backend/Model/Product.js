const mongoose = require("mongoose");
const Review = require("./Review");
const Category = require("./Category");
const ProductFamily = require("./ProductFamily");
const ProductType = require("./ProductType");
const Package = require("./Package");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      maxLength: 255,
      minLength: 1,
      required: true,
      unique: true,
    },
    nepaliName: {
      type: String,
      maxLength: 255,
      minLength: 1,
      required: false,
      unique: true,
    },
    rate: {
      type: Number,
      min: 1,
      required: true,
    },
    unitType: {
      type: String,
      minLength: 1,
      required: true,
    },
    secondRate: {
      type: Number,
      min: 1,
      required: false,
    },
    secondUnitType: {
      type: String,
      minLength: 1,
      required: false,
    },
    crossedPrice: {
      type: Number,
      min: 1,
      required: false,
    },
    stock: {
      type: String,
      enum: ["InStock", "Out of Stock", "Unavailable"],
      required: true,
    },
    productFamilyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductFamily",
      required: true,
    },
    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    organic: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    edibleType: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    vegNonVeg: {
      type: String,
      enum: ["Non veg", "Veg"],
      required: false,
    },
    image: 
      [{
        type: String,
      }],
    
    productDescription: {
      type: String,
      required: false,
    },
    compare: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
