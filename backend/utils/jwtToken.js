const { none } = require("../middleware/fileUpload");

// Create and send token and save in the cookie
const sendToken = (user, statusCode, message, res) => {
  //Create JWT token
  const token = user.getJwtToken();

  //Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,

  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token: token,
    user: user,
    message: message,
  });
};

module.exports = sendToken;
