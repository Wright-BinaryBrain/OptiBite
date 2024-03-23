const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const ProductFamily = require("../Model/ProductFamily");

exports.postProductFamily = catchAsyncErrors(async (req, res, next) => {
  const newProductFamily = req.body;
  const productFamily = await ProductFamily(newProductFamily).save();
  res.status(200).json({
    success: true,
    message: "Product Family added successfully!",
    data: productFamily,
  });
});

exports.getAllProductFamily = catchAsyncErrors(async (req, res, next) => {
  if (req.query.rowsPerPage) {
    const resultPerPage = req.query.rowsPerPage;
    const productFamilyCount = await ProductFamily.countDocuments();

    const apiFeatures = new APIFeatures(ProductFamily.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const productFamilies = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: productFamilyCount,
      data: productFamilies,
      message: "All user fetched successfully!",
      resultPerPage,
    });
  } else {
    const productFamilyCount = await ProductFamily.countDocuments();

    const apiFeatures = new APIFeatures(ProductFamily.find(), req.query)
      .search()
      .filter();
    const productFamilies = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: productFamilyCount,
      data: productFamilies,
      message: "All user fetched successfully!",
    });
  }
});

exports.getOneProductFamily = catchAsyncErrors(async (req, res, next) => {
  const productFamily = await ProductFamily.findById(req.params.id);
  if (!productFamily) {
    return next(new ErrorHandler("Product Family not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Family found successfully!",
    data: productFamily,
  });
});

exports.updateProductFamily = catchAsyncErrors(async (req, res, next) => {
  const productFamily = await ProductFamily.findById(req.params.id);
  if (!productFamily) {
    return next(new ErrorHandler("Product Family not found", 404));
  }
  const patchProductFamily = req.body;
  await ProductFamily.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: patchProductFamily }
  );
  res.status(200).json({
    success: true,
    message: "Product Family updated successfully!",
  });
});

exports.deleteProductFamily = catchAsyncErrors(async (req, res, next) => {
  const productFamily = await ProductFamily.findById(req.params.id);
  if (!productFamily) {
    return next(new ErrorHandler("Product Family not found", 404));
  }
  await ProductFamily.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product Family deleted successfully!",
  });
});
