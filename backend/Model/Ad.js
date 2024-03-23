const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
    {
        image: [{
            type: String,
            required: true,
        }],
        url: {
            type: String,
            required: true,
            trim: true
        },
        createdDate: {
            type: Date,
            default: Date.now(),
            required: false
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model("ad", adSchema);