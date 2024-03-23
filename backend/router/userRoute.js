const express = require("express");
const router = express.Router();

const {
  postUser,
  getAllUser,
  getOneUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const userValidation = require("../validation/userValidation");

router
  .route("/register")
  .post(
    postUser
  );

router
  .route("/getAllUser")
  .get(
    isAuthenticated, 
    authorizeRoles("superAdmin", "admin"), 
    getAllUser
  );

router
  .route("/getUser/:id")
  .get(
    isAuthenticated, 
    authorizeRoles("superAdmin", "admin"), 
    getOneUser
  );

router
  .route("/updateUser/:id")
  .patch(
    isAuthenticated, 
    authorizeRoles("superAdmin"), 
    userValidation, 
    updateUser
  );

router
  .route("/deleteUser/:id")
  .delete(
    isAuthenticated, 
    authorizeRoles("superAdmin"), 
    deleteUser
  );

module.exports = router;
