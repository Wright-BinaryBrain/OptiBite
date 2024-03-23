const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Order = require("../Model/Order");


exports.getDailyRevenue = catchAsyncErrors(async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate input: startDate and endDate should be valid ISO date strings
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Both startDate and endDate are required." });
    }

    const orders = await Order.find({
      orderDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    var revenue = 0;
    orders.forEach( order => {
      revenue = revenue + order.totalAmount
    })
    res.status(200).json({
      success: true,
      message: "success",
      data: revenue
  });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching orders." });
  }
});

