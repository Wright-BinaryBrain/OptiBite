const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const Favourite = require("../Model/Favourite");

exports.postFavourite = catchAsyncErrors(async (req, res, next) => {
  req.body.userId = req.user.id;
  const newFavourite = req.body;
  const favourite = await new Favourite(newFavourite).save();
  res.status(200).json({
    success: true,
    message: "Favourite created successfully!",
    data: favourite,
  });
});

exports.getMyFavourite = catchAsyncErrors(async (req, res, next) => {
  const favourite = await Favourite.find({ userId: req.user.id });
  // console.log(favourite)
  if (favourite.length == 0) {
    return next(new ErrorHandler("Favourite not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Favourite found successfully!",
    data: favourite[0],
  });
});

exports.getOneFavourite = catchAsyncErrors(async (req, res, next) => {
  const favourite = await Favourite.findById(req.params.id);
  if (!favourite) {
    return next(new ErrorHandler("Favourite not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Favourite found successfully!",
    data: favourite,
  });
});

exports.updateFavourite = catchAsyncErrors(async (req, res, next) => {
  const myFavourite = await Favourite.find({ userId: req.user.id });
  if (myFavourite.length == 0) {
    return next(new ErrorHandler("Favourite not found", 404));
  }
  const patchFavourite = req.body;
  await Favourite.findByIdAndUpdate(
    { _id: myFavourite[0]._id.toString() },
    { $set: patchFavourite }
  );
  res.status(200).json({
    success: true,
    message: "Favourite updated successfully!",
  });
});

exports.deleteMyFavourite = catchAsyncErrors(async (req, res, next) => {
  const myFavourite = await Favourite.findOne({ userId: req.user.id });
  if (!myFavourite) {
    return next(new ErrorHandler("Favourite not found", 404));
  }
  await Favourite.findOneAndDelete({ userId: req.user.id });
  res.status(200).json({
    success: true,
    message: "Favourite deleted successfully!",
  });
});