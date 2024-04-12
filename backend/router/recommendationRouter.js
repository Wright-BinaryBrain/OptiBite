const express = require("express");
const { getUserOrders } = require("../controller/recommendationController");
const {  getUser } = require("../middleware/auth");
const router = express.Router();
const adValidation = require("../validation/adValidation");
const upload = require("../middleware/fileUpload");

router
    .route('/getrecommendation')
    .get(
        getUser,
        getUserOrders 
       );



module.exports = router;