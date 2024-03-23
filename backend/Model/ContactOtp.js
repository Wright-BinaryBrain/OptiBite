const mongoose = require("mongoose");

const contactOtpSchema = new mongoose.Schema(
    {
        contactNo1: {
            type: String,
            maxLength: [10, "Please enter a valid number"],
            minLength: [10, "Please enter a valid number"],
            unique: true,
            required: true,
        },
        otpCode: {
            type: String,
            maxLength: [6, "Please enter a otp"],
            minLength: [6, "Please enter a otp"],
            unique: true
        }
    },
    { timestamp: true }
);

// Adding a post hook to delete the object after 2 mins when saving or updating.
contactOtpSchema.post("save", function (doc, next) {
    // doc is the saved or updated document
    setTimeout(() => {
      doc.remove();
    }, 120000); // 120000 milliseconds = 2 mins
    next();
  });

module.exports = mongoose.model("ContactOtp", contactOtpSchema);