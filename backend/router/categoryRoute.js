const express = require("express");
const {
  postCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const categoryValidation = require("../validation/categoryValidation");

router
  .route("/postCategory")
  .post(
    isAuthenticated, 
    authorizeRoles("admin", "superAdmin"), 
    categoryValidation, 
    postCategory
  );

router
  .route("/getAllCategory")
  .get(
    getAllCategory
  );

router
  .route("/getOneCategory/:id")
  .get(
    getOneCategory
  );

router
  .route("/updateCategory/:id")
  .patch(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    categoryValidation,
    updateCategory
  );
  
router
  .route("/deleteCategory/:id")
  .delete(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    deleteCategory
  );

module.exports = router;
