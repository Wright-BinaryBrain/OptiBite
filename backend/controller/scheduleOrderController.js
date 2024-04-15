
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Schedule = require("../Model/Schedule");

// Create a schedule
exports.postScheduleOrder = catchAsyncErrors(async (req, res, next) => {
  const newSchedule = req.body;
  const schedule = await new Schedule(newSchedule).save();
  res.status(200).json({
    success: true,
    message: "Schedule created successfully!",
    data: schedule,
  });
});


//Get all schedule
exports.getAllScheduledOrders = catchAsyncErrors(async (req, res, next) => {
  if (req.query.rowsPerPage) {
    const resultPerPage = req.query.rowsPerPage;
    const scheduleCount = await Schedule.countDocuments();

    const apiFeatures = new APIFeatures(Schedule.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const schedules = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: scheduleCount,
      data: schedules,
      message: "All schedule fetched successfully!",
      resultPerPage,
    });
  } else {
    const scheduleCount = await Schedule.countDocuments();

    const apiFeatures = new APIFeatures(Schedule.find(), req.query)
      .search()
      .filter();
    const schedules = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: scheduleCount,
      data: schedules,
      message: "All schedule fetched successfully!",
    });
  }
});


//Get Particular Schedule
exports.getOneScheduledOrder = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) {
    return next(new ErrorHandler("Schedule not found", 404));
  }
  res.status(200).json({
    success: true,
    data: schedule,
    message: "Schedule fetched successfully!",
  });
});


//Update Schedule
exports.updateScheduledOrder = catchAsyncErrors(async (req, res, next) => {
  let schedule = await Schedule.findById(req.params.id);
  if (!schedule) {
    return next(new ErrorHandler("Schedule not found", 404));
  }
  schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Schedule updated successfully!",
    data: schedule,
  });
});


//Delete Schedule
exports.deleteScheduledOrder = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id);
  if (!schedule) {
    return next(new ErrorHandler("Schedule not found", 404));
  }
  await schedule.remove();
  res.status(200).json({
    success: true,
    message: "Schedule deleted successfully!",
  });
});


//Get all schedule by user
exports.getAllScheduledByUser = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.find({ userId: req.params.id });
  if (!schedule) {
    return next(new ErrorHandler("Schedule not found", 404));
  }
  res.status(200).json({
    success: true,
    data: schedule,
    message: "Schedule fetched successfully!",
  });
});



//Get all schedule by status
exports.getAllScheduledByStatus = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.find({ orderStatus: req.params.status });
  if (!schedule) {
    return next(new ErrorHandler("Schedule not found", 404));
  }
  res.status(200).json({
    success: true,
    data: schedule,
    message: "Schedule fetched successfully!",
  });
});


//Get all schedule by date
exports.getAllScheduledByDate = catchAsyncErrors(async (req, res, next) => {
  const schedule = await Schedule.find({
    startDate: { $gte: req.params.startDate, $lt: req.params.endDate },
  });
  if (!schedule) {
    return next(new ErrorHandler("Schedule not found", 404));
  }
  res.status(200).json({
    success: true,
    data: schedule,
    message: "Schedule fetched successfully!",
  });
});
