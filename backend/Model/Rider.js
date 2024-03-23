const { string } = require("joi");
const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    riderName: {
      type: String,
      minLength: 3,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      minLength: 10,
      maxLength: 10,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      minLength: 3,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      tolowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    image: [
        {
            type: String,
        }
    ]
}, {timestamp: true});

module.exports = mongoose.model("Rider", riderSchema);
