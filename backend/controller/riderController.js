const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const upload = require("../middleware/fileUpload");
const APIFeatures = require("../utils/apiFeatures");
const path = require('path');

const Rider = require("../Model/Rider");

exports.postRider = catchAsyncErrors(async (req, res, next) => {
    if (req.files == undefined) {
        return next(new ErrorHandler("Invalid Image", 401));
    };
    let images = [];
    req.files.forEach(async (f) => {
        await images.push(f.filename);
    });
    req.body.image = images;
    const rider = await new Rider(req.body).save();
    res.status(200).json({ 
        success: true,
        message: "Rider posted successfully!",
        data: rider, 
    });
});

exports.getAllRider = catchAsyncErrors(async (req, res, next) => {
    if (req.body.rowsPerPage){
        const resultPerPage = req.body.rowsPerPage;
        const riderCount = await Rider.countDocuments();
  
        const apiFeatures = new APIFeatures(Rider.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);
        const riders = await apiFeatures.query;
  
        res.status(200).json({
            success: true,
            count: riderCount,
            data: riders,
            message: "All rider fetched successfully!",
            resultPerPage,
        }); 
    }
    else{
        const riderCount = await Rider.countDocuments();
  
        const apiFeatures = new APIFeatures(Rider.find(), req.query)
            .search()
            .filter();
        const riders = await apiFeatures.query;
  
        res.status(200).json({
            success: true,
            count: riderCount,
            data: riders,
            message: "All rider fetched successfully!"
        }); 
    }
});

exports.getOneRider = catchAsyncErrors(async (req, res, next) => {
    const rider = await Rider.findById(req.params.id);
    if (!rider) {
      return next(new ErrorHandler("Rider not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Rider found successfully!",
      data: rider,
    });
});

exports.updateRider = catchAsyncErrors(async (req, res, next) => {
    if (req.files == undefined) {
        return next(new ErrorHandler("Invalid Image", 401));
    }
    let images = [];
    req.files.forEach(async (f) => {
        await images.push(f.filename);
    });
    // await Rider.findById({ _id: req.params.id }).then((res) => {
    //     res.image.forEach(async (f) => {
    //         await images.push(f);
    //     });
    // });
    req.body.image = images;
    const rider = await Rider.findByIdAndUpdate({ _id: req.params.id },{ $set: req.body });
    res.status(200).json({ 
        success: true,
        message: "Rider updated successfully!" 
    });
});

exports.deleteRider = catchAsyncErrors(async (req, res, next) => {
    // await Rider.findById({ _id: req.params.id }).then((res) => {
    //     res.image.forEach((res) => {
    //         rimraf(path.join(__dirname, `../files/image/${res}`), (err) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //         });
    //     });
    // });
    const rider = await Rider.findByIdAndDelete(req.params.id);
    if (!rider) {
        return res.status(401).json({ 
            success: false, 
            message: "No such rider found." 
        });
    }
    res.status(200).json({ 
        success: true, 
        message: "Rider deleted Successfully!" 
    });
});