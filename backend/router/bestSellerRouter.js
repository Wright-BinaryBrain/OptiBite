const express = require("express");
const {
  postBestSeller,
  getAllBestSeller,
  deleteBestSeller,
} = require("../controller/bestSellerController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const bestSellerValidation = require("../validation/bestSellerValidation");

router
  .route("/postBestSeller")
  .post(
    isAuthenticated, 
    authorizeRoles("admin", "superAdmin"), 
    bestSellerValidation, 
    postBestSeller
  );

router
  .route("/getAllBestSeller")
  .get(
    getAllBestSeller
  );

router
  .route("/deleteBestSeller/:id")
  .delete(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    deleteBestSeller
  );

module.exports = router;
