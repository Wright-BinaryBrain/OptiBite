const express = require("express");
const { postUpdateAndSendContactOtp } = require("../controller/contactOTPController");
const router = express.Router();

router
  .route("/sendOtp")
  .post(
    postUpdateAndSendContactOtp
  );

module.exports = router;