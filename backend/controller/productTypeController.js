const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const ProductType = require("../Model/ProductType");

exports.postProductType = catchAsyncErrors(async (req, res, next) => {
  const newProductType = req.body;
  const productType = await ProductType(newProductType).save();
  res.status(200).json({
    success: true,
    message: "Product Type added successfully!",
    data: productType,
  });
});

exports.getAllProductType = catchAsyncErrors(async (req, res, next) => {
  if (req.query.rowsPerPage) {
    const resultPerPage = req.query.rowsPerPage;
    const productTypeCount = await ProductType.countDocuments();

    const apiFeatures = new APIFeatures(ProductType.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const productTypes = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: productTypeCount,
      data: productTypes,
      message: "All productType fetched successfully!",
      resultPerPage,
    });
  } else {
    const productTypeCount = await ProductType.countDocuments();

    const apiFeatures = new APIFeatures(ProductType.find(), req.query)
      .search()
      .filter();
    const productTypes = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: productTypeCount,
      data: productTypes,
      message: "All productType fetched successfully!",
    });
  }
});

exports.getOneProductType = catchAsyncErrors(async (req, res, next) => {
  const productType = await ProductType.findById(req.params.id);
  if (!productType) {
    return next(new ErrorHandler("Product Type not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Type found successfully!",
    data: productType,
  });
});

exports.updateProductType = catchAsyncErrors(async (req, res, next) => {
  const productType = await ProductType.findById(req.params.id);
  if (!productType) {
    return next(new ErrorHandler("Product Type not found", 404));
  }
  const patchProductType = req.body;
  await ProductType.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: patchProductType }
  );
  res.status(200).json({
    success: true,
    message: "Product Type updated successfully!",
  });
});

exports.deleteProductType = catchAsyncErrors(async (req, res, next) => {
  const productType = await ProductType.findById(req.params.id);
  if (!productType) {
    return next(new ErrorHandler("Product Type not found", 404));
  }
  await ProductType.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product Type deleted successfully!",
  });
});
