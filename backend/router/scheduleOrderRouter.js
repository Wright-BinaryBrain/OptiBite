const express = require("express");
const router = express.Router();

const {
    postScheduleOrder,
    getAllScheduledOrders,
    getOneScheduledOrder,
    updateScheduledOrder,
    deleteScheduledOrder,
    getAllScheduledByUser,
    getAllScheduledByStatus,
    getAllScheduledByDate,
    } = require("../controller/scheduleOrderController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const scheduleOrderValidation = require("../validation/scheduleOrderValidation");


router
    .route("/scheduleOrder")
    .post(
        isAuthenticated,
        scheduleOrderValidation,
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
    .route("/getOneScheduledOrder/:id")
    .get(
        isAuthenticated, 
        authorizeRoles("superAdmin", "admin"), 
        getOneScheduledOrder
    );

router
    .route("/updateScheduledOrder/:id")
    .patch(
        isAuthenticated, 
        authorizeRoles("superAdmin"), 
        scheduleOrderValidation, 
        updateScheduledOrder
    );


    router
    .route("/deleteScheduledOrder/:id")
    .delete(
        isAuthenticated, 
        authorizeRoles("superAdmin"), 
        deleteScheduledOrder
    );

router
    .route("/getScheduledByUser/:id")
    .get(
        isAuthenticated, 
        authorizeRoles("user"), 
        getAllScheduledByUser
    );

router
    .route("/getScheduledByStatus/:status")
    .get(
        isAuthenticated, 
        authorizeRoles("superAdmin", "admin"), 
        getAllScheduledByStatus
    );

router
    .route("/getScheduledByDate/:startDate/:endDate")
    .get(
        isAuthenticated, 
        authorizeRoles("superAdmin", "admin"), 
        getAllScheduledByDate
    );

module.exports = router;
