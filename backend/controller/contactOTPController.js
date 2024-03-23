const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const ContactOtp = require("../Model/ContactOtp");
const otpGenerator = require("otp-generator");
const sendCustomerSms = require("../utils/sendCustomerSms")



exports.postUpdateAndSendContactOtp = catchAsyncErrors(async (req, res, next) => {

    const OTP = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        lowerCaseAlphabets: false,
        specialChars: false 
    });

    req.body.otpCode = OTP;
    const newContactOtp = req.body;

    var paramList = [req.body.contactNo1, OTP];

    sendCustomerSms(paramList);

    const existingContactOtp = await ContactOtp.findOne({ contactNo1: req.body.contactNo1 })


    if( !existingContactOtp){
        const contactOtp = await ContactOtp(newContactOtp).save();
        res.status(200).json({
          success: true,
          message: "Contact OTP added and sent successfully!"
        });
    } else{
        await ContactOtp.findOneAndUpdate(
            { contactNo1: req.body.contactNo1 },
            { otpCode: OTP }
        );
        res.status(200).json({
            success: true,
            message: "OTP code updated and sent successfully!",
        });
    }
});