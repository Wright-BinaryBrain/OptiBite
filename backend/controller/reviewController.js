const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Review = require("../Model/Review");

//Review Post
exports.postReview = catchAsyncErrors(async (req, res, next) => {
  req.body.userID = req.user.id;
  const review = await Review.create(req.body);
  res.status(200).json({
    success: true,
    message: "Review Submitted Successfully!",
    data: review,
  });
});

// Get all Review (admin)
exports.getAllReview = catchAsyncErrors(async (req, res, next) => {
  if (req.query.rowsPerPage) {
    const resultPerPage = req.query.rowsPerPage;
    const reviewCount = await Review.countDocuments();

    const apiFeatures = new APIFeatures(Review.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const reviews = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: reviewCount,
      data: reviews,
      message: "All user fetched successfully!",
      resultPerPage,
    });
  } else {
    const reviewCount = await Review.countDocuments();

    const apiFeatures = new APIFeatures(Review.find(), req.query)
      .search()
      .filter();
    const reviews = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: reviewCount,
      data: reviews,
      message: "All user fetched successfully!",
    });
  }
});

//Get User Review
exports.getMyReview = catchAsyncErrors(async (req, res, next) => {
  //  const review = await Review.find({ userID: req.user.id });
  const review = await Review.findById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Review fetched successfully!",
    data: review,
  });
});

//Update review
exports.updateReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorHandler("Review Family not found", 404));
  }
  const patchReview = req.body;
  await Review.findByIdAndUpdate({ _id: req.params.id }, { $set: patchReview });
  res.status(200).json({
    success: true,
    message: "Review Type updated successfully!",
  });
});

//Delete User Review (SuperAdmin)
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }
  await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Review deleted successfully!",
  });
});
