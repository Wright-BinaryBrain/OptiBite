const express = require("express");
const { sendEmailToSabjiland } = require("../controller/emailController");
const router = express.Router();

router
    .route('/sendEmail')
    .post(
        sendEmailToSabjiland
    );




module.exports = router;