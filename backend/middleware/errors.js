const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    //Wrong Mongoose ObjectId Error
    if (err.name === "CastError") {
      const message = `Resource not found with id of ${err.value}. Invalid ${err.path}`;
      error = new ErrorHandler(message, 404);
    }

    //Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new ErrorHandler(message, 400);
    }

    //Duplicate Key Error
    if (err.code === 11000) {
      const message = `Duplicate field value: ${Object.keys(
        err.keyValue
      )}. Please use another value`;
      error = new ErrorHandler(message, 400);
    }

    //Handling JsonWebTokenError
    if (err.name === "JsonWebTokenError") {
      const message = "Invalid Token. Try Again!!";
      error = new ErrorHandler(message, 401);
    }

    //Handling TokenExpiredError
    if (err.name === "TokenExpiredError") {
      const message = "Token Expired. Please Login Again!!";
      error = new ErrorHandler(message, 401);
    }

    //Any Other Error
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
