const mongoose = require("mongoose");
const User = require("./User");
const Order = require("./Order");

const reviewSchema = new mongoose.Schema(
  {
    userReview: {
      type: String,
      maxLength: 255,
      minLength: 1,
    },
    rating: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
    },
    reviewDate: {
      type: Date,
      default: Date.now(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
