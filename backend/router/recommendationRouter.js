const express = require("express");
const { getUserOrders } = require("../controller/recommendationController");
const { getUser } = require("../middleware/auth");
const router = express.Router();

router.route("/getrecommendation").get(getUser, getUserOrders);

module.exports = router;
