const mongoose = require("mongoose");

const scheduleOrderSchema = new mongoose.Schema(
    {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        timeOfDelivery: {
            type: String,
            required: true,
        },
        productId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
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
        totalAmount: {
            type: Number
        },
        orderAddress: {
            type: String,
        },
        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "In Process",
                "Being Delivered",
                "Completed",
                "Cancelled",
            ],
            default: "Pending",
        }
    },
    { 
        timestamps: true 
    }
);

const ScheduleOrder = mongoose.model("ScheduleOrder", scheduleOrderSchema);

module.exports = ScheduleOrder;
