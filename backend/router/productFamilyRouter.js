const express = require("express");
const {
  postProductFamily,
  getAllProductFamily,
  getOneProductFamily,
  updateProductFamily,
  deleteProductFamily,
} = require("../controller/productFamilyController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const productFamilyValidation = require("../validation/productFamilyValidation");

router
  .route("/postProductFamily")
  .post(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    productFamilyValidation,
    postProductFamily
  );

router
  .route("/getAllProductFamily")
  .get(
    getAllProductFamily
  );

router
  .route("/getProductFamily/:id")
  .get(
    getOneProductFamily
  );

router
  .route("/updateProductFamily/:id")
  .patch(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    productFamilyValidation,
    updateProductFamily
  );
  
router
  .route("/deleteProductFamily/:id")
  .delete(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    deleteProductFamily
  );

module.exports = router;
