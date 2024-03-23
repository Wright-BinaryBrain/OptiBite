const express = require("express");
const router = express.Router();

const {
  postProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getHighestAndLowestRate,
  getAllProductAlphaSortedAsc,
} = require("../controller/productController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const upload = require("../middleware/fileUpload");

const productValidation = require("../validation/productValidation");

router
  .route("/postProduct")
  .post(
    isAuthenticated,
    authorizeRoles("superAdmin", "admin"),
    productValidation,
    upload.array("image", 3),
    postProduct
  );

//api/v1/getProducts?keyword=...&price[gte]=..&price[lte]=..
router
  .route("/getProducts")
  .get(
    getAllProduct
  );

router
  .route("/getHighestAndLowestRate")
  .get(
    getHighestAndLowestRate
  );

router
  .route("/getProduct/:id")
  .get(
    getOneProduct
  );

router
  .route("/updateProduct/:id")
  .patch(
    isAuthenticated,
    authorizeRoles("superAdmin", "admin"),
    productValidation,
    upload.array("image", 3),
    updateProduct
  );

router
  .route("/deleteProduct/:id")
  .delete(
    isAuthenticated,
    authorizeRoles("superAdmin", "admin"),
    deleteProduct
  );

module.exports = router;
