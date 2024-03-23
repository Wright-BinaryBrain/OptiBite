const express = require("express");
const { postAd, getAllAd, deleteAd } = require("../controller/adController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
const adValidation = require("../validation/adValidation");
const upload = require("../middleware/fileUpload");

router
    .route('/postAd')
    .post(
        isAuthenticated, 
        authorizeRoles("admin", "superAdmin"), 
        adValidation, 
        upload.array("image", 1), 
        postAd);

router
    .route('/getAllAd')
    .get(
        getAllAd
    );

router
    .route('/deleteAd/:id')
    .delete(
        isAuthenticated, 
        authorizeRoles("admin", "superAdmin"),
        deleteAd
    );

module.exports = router;