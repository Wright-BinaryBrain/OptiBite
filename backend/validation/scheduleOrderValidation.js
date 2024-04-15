const joi = require("joi");

const scheduleOrderSchema = joi.object({
    startDate: joi.date().required(true),
    endDate: joi.date().required(true),
    timeOfDelivery: joi.string().required(true),
    productId: joi.array().items(joi.string()).required(true),
    userId: joi.string().required(true),
    quantity: joi.number().required(true),
    rates: joi.number().required(false),
    totalAmount: joi.number().required(true),
    orderAddress: joi.string().required(true),
    orderStatus: joi.string().valid("Pending", "In Process", "Being Delivered", "Completed", "Cancelled").default("Pending")
    });

    const scheduleOrderValidation = (req, res, next) => {
        const scheduleOrderObject = req.body;
        console.log(req.body);
        const { err } = scheduleOrderSchema.validate(scheduleOrderObject);
        if (!err) {
            next();
        } else {
            res.json(err.message);
        }
    }
    
    module.exports = scheduleOrderValidation;