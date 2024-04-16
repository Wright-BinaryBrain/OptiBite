const User = require("../Model/User");
const ContactOtp = require("../Model/ContactOtp");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//Register a new user  => /api/v1/register
exports.register = catchAsyncErrors(async (req, res, next) => {
  req.body.role = "customer";
  const {
    name,
    email,
    password,
    confirmPassword,
    contactNo1,
    contactNo2,
    role,
  } = req.body;

  // Checking if  User in DB
  const checkUserEmail = await User.findOne({ email: email });
  const checkUserContact1 = await User.findOne({ contactNo1: contactNo1 });

  if (checkUserEmail) {
    res.status(400).json({
      message: "User with the email already exists.",
      success: false,
    });
  } else if (checkUserContact1) {
    res.status(400).json({
      message: "User with the primary contact already exists.",
      success: false,
    });
  } else {
    const contactOtp = await ContactOtp.findOne({ contactNo1: contactNo1 });

    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      contactNo1,
      contactNo2,
      role,
    });
    sendToken(user, 200, "User Register successfully", res);
  }
});

//Login User => /api/v1/login
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if Email and Password is Entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //Finding User in DB
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //Checks if password is correct
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Password", 401));
  }

  sendToken(user, 200, "User logged in successfully", res);
});

//User Profile
exports.getMe = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: user,
    });
    
  } catch (error) {
    console.log(error);
  }
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
});

//Update/Change Password  => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //Check if old password is correct
  if (!(await user.comparePassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  //Check if new password is correct
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  //Set new password
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, "Password updated successfully", res);
});
