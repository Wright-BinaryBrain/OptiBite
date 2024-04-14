const joi = require("joi");

const orderSchema = joi.object({
  guestName: joi.string().required(false).min(4),

  guestContact: joi.string().required(false).min(10).max(10),

  quantity: joi.number().min(1),

  rates: joi.number().required(false),

  orderAddress: joi.string().required(true),
});

const orderValidation = (req, res, next) => {
  // console.log("from joi validation", req.body);
  const orderObject = req.body;
  const { err } = orderSchema.validate(orderObject);
  if (!err) {
    next();
  } else {
    res.json(err.message);
  }
};

module.exports = orderValidation;
