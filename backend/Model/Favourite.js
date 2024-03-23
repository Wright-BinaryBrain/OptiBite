const mongoose = require("mongoose");
const User = require('../Model/User');
const Product = require('../Model/Product');

const favouriteSchema = new mongoose.Schema(
    {
        productId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false
        }],
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          unique: true,
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model("Favourite", favouriteSchema);