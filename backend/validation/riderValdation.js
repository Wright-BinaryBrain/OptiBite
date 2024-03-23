const joi = require("joi");

const riderSchema = joi.object({
  riderName: joi.string().min(3).required(true),

  contact: joi
    .string()
    .min(10)
    .max(10)
    .required(true)
    .regex(/^[0-9]*$ /),

  address: joi.string().min(3).required(true),

  email: joi
    .string()
    .trim(true)
    .lowercase(true)
    .required(true)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  documentImages: joi.string().required(true),
});

const riderValidation = (req, res, next) => {
  const riderObject = req.body;
  const { err } = riderSchema.validate(riderObject);
  if (!err) {
    next();
  } else {
    res.json(err.message);
  }
};

module.exports = riderValidation;
