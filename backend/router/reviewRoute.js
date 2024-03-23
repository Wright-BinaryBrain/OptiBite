const express = require("express");
const router = express.Router();

const {
  postReview,
  getAllReview,
  getMyReview,
  deleteReview,
  updateReview,
} = require("../controller/reviewController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const reviewValidation = require("../validation/reviewValidation");

router
  .route("/addReview")
  .post(
    isAuthenticated, 
    reviewValidation, 
    postReview
  );

router
  .route("/getAllReview")
  .get(
    isAuthenticated, 
    authorizeRoles("admin", "superAdmin"), 
    getAllReview
  );

router
  .route("/myReview")
  .get(
    isAuthenticated, 
    getMyReview
  );

router
  .route("/updateReview")
  .patch(
    isAuthenticated, 
    reviewValidation, 
    updateReview
  );

router
  .route("/deleteReview/:id")
  .delete(
    isAuthenticated, 
    authorizeRoles("superAdmin"), 
    deleteReview
  );

module.exports = router;
