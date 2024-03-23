const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Category = require("../Model/Category");

exports.postCategory = catchAsyncErrors(async (req, res, next) => {
    const newCategory = req.body;
    const category = await Category(newCategory).save();
    res.status(200).json({
      success: true,
      message: "Category added successfully!",
      data: category,
    });
});

exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  if (req.query.rowsPerPage) {
    const resultPerPage = req.query.rowsPerPage;
    const categoryCount = await Category.countDocuments();

    const apiFeatures = new APIFeatures(Category.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const categories = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: categoryCount,
      data: categories,
      message: "All category fetched successfully!",
      resultPerPage,
    });
  } else {
    const categoryCount = await Category.countDocuments();

    const apiFeatures = new APIFeatures(Category.find(), req.query)
      .search()
      .filter();
    const categories = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: categoryCount,
      data: categories,
      message: "All category fetched successfully!",
    });
  }
});

exports.getOneCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Category found successfully!",
      data: category,
    });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }
    const patchCategory = req.body;
    await Category.findByIdAndUpdate({ _id: req.params.id }, { $set: patchCategory });
    res.status(200).json({
      success: true,
      message: "Category updated successfully!",
    });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
});


