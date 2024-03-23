const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const nodemailer = require("nodemailer");

exports.sendEmailToSabjiland = catchAsyncErrors(async (req, res, next) => {

    // connect smtp
    const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        auth: {
            user: 'sabjilandmessages@gmail.com',
            pass: 'otgnrkfcqehruovw'
        },
    });

    const info = await transporter.sendMail({
        from: "sabjilandmessages@gmail.com",
        to: "sabjiland.business@gmail.com",
        subject: "From customer " + req.body.customerName,
        html: `
        <h2 style="font-size: 24px;">Customer Name: ${req.body.customerName}</h2>
        <p style="font-size: 18px;">Contact Number: ${req.body.customerContact}</p>
        <p style="font-size: 18px;">Customer Email: ${req.body.customerEmail}</p>
        <p style="font-size: 18px;">Message: ${req.body.customerMessage}</p>
    `
    })

    res.status(200).json({
        success: true,
        message: "Email sent",
        data: info.messageId,
    });
});


