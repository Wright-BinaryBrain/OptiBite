const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require('../Model/User')
const Order = require('../Model/Order')

const nodemailer = require("nodemailer");

const orderStatusToCustomerEmail = catchAsyncErrors(async (paramList) => {

    if (paramList.Length == 2){
        var orderDate = paramList[0]
        var userId = paramList[1]
    }
    else {
        var orderDate = paramList[0]
        var userId = paramList[1]
        var orderId = paramList[2]
        var orderStatus = paramList[3]
    }

    const user = await User.findById(userId)

    const date = new Date(orderDate);
    const options = {
        timeZone: "Asia/Kathmandu",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };
    const nepalTime = date.toLocaleString("en-US", options);
    const onlyDate = nepalTime.split(",")[0].trim();

    // connect smtp
    const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        auth: {
            user: 'sabjilandorders@gmail.com',
            pass: 'eryvjxwscjawxlve'
        },
    });

    if (!orderStatus){
        const info = await transporter.sendMail({
            from: "sabjilandorders@gmail.com",
            to: user.email,
            subject: "New Order Made",
            html: `
            <p style="font-size: 18px; color: black;">
                Customer name: ${user.name}<br>
                Your email: ${user.email}<br>
                Your order has been made. <br>
                Please check your account for the details on www.sabjiland.com <br>
                Order date: ${onlyDate} <br><br><br>
                This is an automated email. Please don't reply this email. <br>
                Our email is sabjiland@gmail.com.
            </p>
        `
        })
    }
    else if (orderStatus) {
        if (orderStatus == "Completed") {
            const info = await transporter.sendMail({
                from: "sabjilandorders@gmail.com",
                to: user.email,
                subject: "Order Completed " + orderId,
                html: `
                <p style="font-size: 18px; color: black;">
                    Customer name: ${user.name}<br>
                    Your email: ${user.email}<br>
                    Your order has been <span style="color: green;"> completed </span> <br>
                    Order date: ${onlyDate}<br>
                    Thank you for the purchase. <br><br><br>
                    This is an automated email. Please don't reply this email. <br>
                    Our email is sabjiland@gmail.com.
                </p>
            `
            })
        }
        else {
            const info = await transporter.sendMail({
                from: "sabjilandorders@gmail.com",
                to: user.email,
                subject: "Order Status Update for order " + orderId,
                html: `
                <p style="font-size: 18px; color: black;">
                    Customer name: ${user.name}<br>
                    Your email: ${user.email}<br>
                    Your order status has been changed to: <span style="color: Blue;"> ${orderStatus} </span> <br>
                    Order date: ${onlyDate} <br><br><br>
                    This is an automated email. Please don't reply this email. <br>
                    Our email is sabjiland@gmail.com.
                </p>
            `
            })
        }
    }
    return("Email sent successfully.");
});

module.exports = orderStatusToCustomerEmail;