const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const BestSeller = require('../Model/BestSeller');

exports.postBestSeller = catchAsyncErrors(async(req, res, next) => {
    const newBestSeller = req.body;
    const bestSeller = await new BestSeller(newBestSeller).save();
    res.status(200).json({
      success: true,
      message: "Best seller added successfully!",
      data: bestSeller,
    });
});

exports.getAllBestSeller = catchAsyncErrors(async(req, res, next) => {
  if (req.body.rowsPerPage){
    const resultPerPage = req.body.rowsPerPage;
    const bestSellerCount = await BestSeller.countDocuments();

    const apiFeatures = new APIFeatures(BestSeller.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const bestSellers = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: bestSellerCount,
      data: bestSellers,
      message: "All user fetched successfully!",
      resultPerPage,
    });
  }
  else{
    const bestSellerCount = await BestSeller.countDocuments();

    const apiFeatures = new APIFeatures(BestSeller.find(), req.query)
      .search()
      .filter();
    const bestSellers = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: bestSellerCount,
      data: bestSellers,
      message: "All user fetched successfully!"
    });

  }
});

exports.deleteBestSeller = catchAsyncErrors(async(req, res, next) => {
    const bestSeller = await BestSeller.findById(req.params.id);
    if (!bestSeller) {
      return next(new ErrorHandler("Best seller not found", 404));
    }
    await BestSeller.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Best seller deleted successfully!",
      data: bestSeller,
    });
});
