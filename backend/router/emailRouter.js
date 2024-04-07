const express = require("express");
const { sendEmailTooptibite } = require("../controller/emailController");
const router = express.Router();

router.route("/sendEmail").post(sendEmailTooptibite);

module.exports = router;
