const express = require("express");
const router = express.Router();

const {
    postScheduleOrder,
    getAllScheduledOrders,
    getOneScheduleOrder,
    deleteScheduleOrder,
    updateScheduleOrder,
    } = require("../controller/scheduleOrderController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const scheduleOrderValidation = require("../validation/scheduleOrderValidation");

router
    .route("/scheduleOrder")
    .post(
        postScheduleOrder
    );

router
    .route("/getAllScheduledOrders")
    .get(
        isAuthenticated, 
        authorizeRoles("superAdmin", "admin"), 
        getAllScheduledOrders
    );

router
    .route("/getOneScheduleOrder/:id")
    .get(
        isAuthenticated, 
        authorizeRoles("superAdmin", "admin"), 
        getOneScheduleOrder
    );

router
    .route("/updateScheduleOrder/:id")
    .patch(
        isAuthenticated, 
        authorizeRoles("superAdmin"), 
        scheduleOrderValidation, 
        updateScheduleOrder
    );

router
    .route("/deleteScheduleOrder/:id")
    .delete(
        isAuthenticated, 
        authorizeRoles("superAdmin"), 
        deleteScheduleOrder
    );

router
    .route("/getScheduleByUser/:id")
    .get(
        isAuthenticated, 
        authorizeRoles("user"), 
        getScheduleByUser
    );

router
    .route("/gerScheduleByStatus/:status")
    .get(
        isAuthenticated, 
        authorizeRoles("superAdmin", "admin"), 
        getScheduleByStatus
    );

router
    .route("/getScheduleByDate/:startDate/:endDate")
    .get(
        isAuthenticated, 
        authorizeRoles("superAdmin", "admin"), 
        getScheduleByDate
    );

module.exports = router;
