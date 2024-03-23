const axios = require('axios');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("./errorHandler");

const User = require('../Model/User')

const sendCustomerSms = catchAsyncErrors(async (paramList) => {
    if(paramList.length == 2){              //case for sending otp
        var phoneNumber = paramList[0]
        const otpCode = paramList[1]
        var smsText = 'Your OTP from sabjiland is: ' + otpCode
    }

    if(paramList.length == 3){              //case for sending order update for logged in users
        var userId = paramList[0]
        var orderDate = paramList[1]
        var orderAddress = paramList[2]

        const user = await User.findById(userId)
        var phoneNumber = user.contactNo1

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

        var smsText = "Dear " + user.name +", your order has been placed and will be delivered to " + 
            orderAddress + ". Your order is created on " + onlyDate + ". You will be contacted soon. Thank you, from Sabji Land."
    }

    if(paramList.length == 4){              //case for sending order update for guests
        var phoneNumber = paramList[0]
        var orderDate = paramList[1]
        var orderAddress = paramList[2]
        var guestName = paramList[3]
        
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

        var smsText = "Dear " + guestName +", your order has been placed and will be delivered to " + 
            orderAddress + ". Your order is created on " + onlyDate + ". You will be contacted soon. Thank you, from Sabji Land."
    }
    



    const apiEndpoint = 'https://api.sparrowsms.com/v2/sms/';
    const token = 'v2_WuSJJMLXXnAJiqeU0tNerc9zOhc.y2P5';
    const identity = 'TheAlert';
    const recipientNumbers = phoneNumber;

    axios.post(apiEndpoint, {
        token: token,
        from: identity,
        to: recipientNumbers,
        text: smsText,
        })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
});

module.exports = sendCustomerSms;