const mongoose = require("mongoose");
const User = require("../Model/User");
const Rider = require("../Model/Rider");
const Product = require("../Model/Product");
const Review = require("../Model/Review");
const { date } = require("joi");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestName: {
      type: String,
      minLength: 4,
      maxLength: 100
    },
    guestContact: {
      type: String,
      minLength: [10, "Please enter a valid number"],
      maxLength: [10, "Please enter a valid number"],
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
    },
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    quantity: [
      {
        type: Number,
        min: 1,
      },
    ],
    rates: [
      {
        type: Number,
        required: false
      }
    ],
    unitTypes: [
      {
        type: String,
        required: false
      }
    ],
    totalAmount: {
      type: Number
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    orderAddress: {
      type: String,
      required: true,
    },
    orderDate:{
        type: Date,
        default: Date.now()
    },
    orderStatus: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "In Process",
        "Being Delivered",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
    paymentDate: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Unpaid", "Paid", "Refunded"],
      default: "Unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online payment"],
      default: "COD"
    },
    image: [{
      type: String
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
