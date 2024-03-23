const mongoose = require("mongoose");
const Product = require('../Model/Product');

const bestSellerSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model("BestSeller", bestSellerSchema);