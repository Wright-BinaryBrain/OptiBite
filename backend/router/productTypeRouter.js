const express = require("express");
const {
  postProductType,
  getAllProductType,
  getOneProductType,
  updateProductType,
  deleteProductType,
} = require("../controller/productTypeController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const productTypeValidation = require("../validation/productTypeValidation");

router
  .route("/postProductType")
  .post(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    productTypeValidation,
    postProductType
  );

router
  .route("/getAllProductType")
  .get(
    getAllProductType
  );

router
  .route("/getProductType/:id")
  .get(
    getOneProductType
  );

router
  .route("/updateProductType/:id")
  .patch(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    productTypeValidation,
    updateProductType
  );
  
router
  .route("/deleteProductType/:id")
  .delete(
    isAuthenticated,
    authorizeRoles("admin", "superAdmin"),
    deleteProductType
  );

module.exports = router;
