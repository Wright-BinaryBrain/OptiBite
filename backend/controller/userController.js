const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const User = require("../Model/User");

// Create an admin
exports.postUser = catchAsyncErrors(async (req, res, next) => {
  const newUser = req.body;
  const user = await new User(newUser).save();
  res.status(200).json({
    success: true,
    message: "User created successfully!",
    data: user,
  });
});

//ADMIN AND SUPER ADMIN CONTROLLERS

//Get all user
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  if (req.query.rowsPerPage) {
    const resultPerPage = req.query.rowsPerPage;
    const userCount = await User.countDocuments();

    const apiFeatures = new APIFeatures(User.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const users = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: userCount,
      data: users,
      message: "All user fetched successfully!",
      resultPerPage,
    });
  } else {
    const userCount = await User.countDocuments();

    const apiFeatures = new APIFeatures(User.find(), req.query)
      .search()
      .filter();
    const users = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: userCount,
      data: users,
      message: "All user fetched successfully!",
    });
  }
});

//Get Particular User
exports.getOneUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User found successfully!",
    data: user,
  });
});

//SUPER ADMIN CONTROLLERS

//Update user
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const patchUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    contactNo1: req.body.contactNo1,
    contactNo2: req.body.contactNo2,
    role: req.body.role,
    address: req.body.address
  };
  await User.findByIdAndUpdate({ _id: req.params.id }, { $set: patchUser });
  res.status(200).json({
    success: true,
    message: "User updated successfully!",
  });
});

// Delete User
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});
