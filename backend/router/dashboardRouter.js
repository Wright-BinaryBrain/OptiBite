const express = require("express");
const { getDailyRevenue } = require("../controller/dashboardController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/getDailyRevenue")
  .get(
    isAuthenticated, 
    authorizeRoles("admin", "superAdmin"), 
    getDailyRevenue
  );

module.exports = router;