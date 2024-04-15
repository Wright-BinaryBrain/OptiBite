const { required } = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
        required: false,
      },
    ],
    totalAmount: {
      type: Number,
    },

    orderAddress: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now(),
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
    startDate: {
      type: Date,
      required:false

    },
    endDate: {
      type: Date,
      required:false
    },
    time:{
      type: String,
      required:false
    },
    scheduled:{
      type: Boolean,
      default: false,
      required:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
