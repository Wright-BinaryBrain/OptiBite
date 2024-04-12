const cron = require("node-cron");
const Schedule = require("../Model/Schedule");
const Order = require("../Model/Order");

cron.schedule("*/5 * * * *", async () => {
    const currentTime = new Date();
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);
    const schedules = await Schedule.find({
        startDate: {
        $gte: currentTime,
        $lt: nextHour,
        },
        orderStatus: "Pending",
    });
    
    schedules.forEach(async (schedule) => {
        const newOrder = {
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        timeOfDelivery: schedule.timeOfDelivery,
        productId: schedule.productId,
        userId: schedule.userId,
        quantity: schedule.quantity,
        rates: schedule.rates,
        totalAmount: schedule.totalAmount,
        orderAddress: schedule.orderAddress,
        orderStatus: "In Process",
        };
        await new Order(newOrder).save();
    });
    console.log("Orders scheduled successfully!");
    
    schedules.forEach(async (schedule) => {
        schedule.orderStatus = "In Process";
        await schedule.save();
    });
});

