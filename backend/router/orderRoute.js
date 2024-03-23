const express = require("express");

const {
  postOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getMyOrder,
  cancelOrder,
} = require("../controller/orderController");

const router = express.Router();

const upload = require("../middleware/fileUpload");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const orderValidation = require("../validation/orderValidation");

router
  .route("/postOrder")
  .post(
    upload.array("image", 1),
    orderValidation, 
    postOrder
  );

router
  .route("/getAllOrder")
  .get(
    isAuthenticated, 
    authorizeRoles("admin", "superAdmin"), 
    getAllOrder
  );

router
  .route("/getOrder/:id")
  .get(
    isAuthenticated, 
    getOneOrder
  );

router
  .route("/getMyOrder")
  .get(
    isAuthenticated,
    getMyOrder
  )

router
  .route("/updateOrder/:id")
  .patch(
    isAuthenticated, 
    authorizeRoles("admin", "superAdmin"), 
    orderValidation, 
    updateOrder
  );

router
  .route("/cancelOrder/:id")
  .patch(
    isAuthenticated, 
    orderValidation, 
    cancelOrder
  );

router
  .route("/deleteOrder/:id")
  .delete(
    isAuthenticated, 
    authorizeRoles("admin", "superAdmin"), 
    deleteOrder
  );

module.exports = router;
