const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Order = require("../Model/Order");
const User = require("../Model/User");
const ContactOtp = require("../Model/ContactOtp");

const orderStatusToCustomerEmail = require("../middleware/orderStatusEmail");
const sendCustomerSms = require("../utils/sendCustomerSms")


exports.postOrder = catchAsyncErrors(async (req, res, next) => {

  if (req.files == undefined) {
    return next(new ErrorHandler("Invalid Image", 401));
  }
  let images = [];
  req.files.forEach(async (f) => {
      await images.push(f.filename);
  });
  req.body.image = images;
  if( images.length !== 0 ) {
    req.body.paymentMethod = "Online payment"
    req.body.paymentStatus = "Paid"
    req.body.paymentDate = Date.now()
  }

  if( !req.body.userId ) {

    const userWithGuestContact = await User.findOne({ contactNo1: req.body.guestContact })
    if( userWithGuestContact ) {
      res.status(400).json({
        success: false,
        message: "User account with the given contact number already exists!"
      });
    }
    else{
      const contactOtp = await ContactOtp.findOne({ contactNo1: req.body.guestContact });
      if(!contactOtp) {
        res.status(404).json({
          message: "Invalid OTP.",
          success: false
        });
      }
      else{
        if(req.body.otpCode == contactOtp.otpCode){
          const orderStatusSmsParamList = [req.body.guestContact, Date.now(), req.body.orderAddress, req.body.guestName];
          sendCustomerSms(orderStatusSmsParamList)
          const order = await new Order(req.body).save();
          res.status(200).json({
            success: true,
            message: "Order posted successfully!",
            data: order,
          });
        }
        else{
          res.status(200).json({
            message: "Invalid OTP.",
            success: false
          });
        }
      }
    }
  }
  else{
    var paramList = [Date.now(), req.body.userId, ]
    var orderStatusSmsParamList = [req.body.userId, Date.now(), req.body.orderAddress];

    orderStatusToCustomerEmail(
      paramList
    );
    // sendCustomerSms(orderStatusSmsParamList)  

    const order = await new Order(req.body).save();
    res.status(200).json({
      success: true,
      message: "Order posted successfully!",
      data: order,
    });
  }
});

exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
  if (req.query.rowsPerPage) {
    const resultPerPage = req.query.rowsPerPage;
    const orderCount = await Order.countDocuments();

    const apiFeatures = new APIFeatures(Order.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const orders = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: orderCount,
      data: orders,
      message: "All user orders successfully!",
      resultPerPage,
    });
  } else {
    const orderCount = await Order.countDocuments();

    const apiFeatures = new APIFeatures(Order.find(), req.query)
      .search()
      .filter();
    const orders = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: orderCount,
      data: orders,
      message: "All user orders successfully!",
    });
  }
});

exports.getOneOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Order found successfully!",
    data: order,
  });
});

exports.getMyOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ userId: req.user.id });
  if (!order) {
    res.status(200).json({
      success: true,
      message: "No order has been made by you."
    });
  }
  res.status(200).json({
    success: true,
    message: "Orders found successfully!",
    data: order,
  });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  if ((req.body.paymentStatus == "Paid")) {
    req.body.paymentDate = Date.now();
  }
  const patchOrder = req.body;
  const orderId = req.params.id

  if (order.orderStatus != req.body.orderStatus) {
    if (order.userId) {
      orderStatusToCustomerEmail(
        paramList = [ 
        order.orderDate, 
        order.userId.toString(),
        orderId,
        req.body.orderStatus
        ]
      )
    }
  }

  await Order.findByIdAndUpdate({ _id: req.params.id }, { $set: patchOrder });
  res.status(200).json({
    success: true,
    message: "Order updated successfully!",
  });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Order deleted successfully!",
  });
});

exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  if(order.userId){
    if(req.user.id == order.userId) {
      if (order.orderStatus == "Pending") {
        req.body.orderStatus = "Cancelled";
        await Order.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.status(200).json({
          success: true,
          message: "Order status changed to canceled!",
        });
      }
      else{
        res.status(400).json({
          success: false,
          message: "Order status was not on pending!",
        });
      }
    }
    else {
      res.status(400).json({
        success: false,
        message: "Not your order!",
      });
    }
  }
  else{
    res.status(400).json({
      success: false,
      message: "Guest order cant be canceled!",
    });
  }
});