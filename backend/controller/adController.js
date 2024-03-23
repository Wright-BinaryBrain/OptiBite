const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const Ad = require("../Model/Ad")

exports.postAd = catchAsyncErrors(async (req, res, next) => {
    if (req.files == undefined) {
      return next(new ErrorHandler("Invalid Image", 401));
    }
    let images = [];
    req.files.forEach(async (f) => {
      await images.push(f.filename);
    });
    req.body.image = images;
    const ad = await new Ad(req.body).save();
    res.status(200).json({
      success: true,
      message: "Ad posted successfully!",
      data: ad,
    });
});

exports.getAllAd = catchAsyncErrors(async (req, res, next) => {
    const ad = await Ad.find().sort({ createdDate: -1 });
    res.status(200).json({
        success: true,
        message: "All Ads fetched successfully!",
        data: ad
    });
}); 

exports.deleteAd = catchAsyncErrors(async (req, res, next) => {
    const ad = await Ad.findByIdAndDelete(req.params.id)
    if (!ad) {
        return next(new ErrorHandler("Ad not found.", 404))
    }
    res.status(200).json({
        success: true,
        message: "Ad deleted successfully!",
        data: ad
    });
});