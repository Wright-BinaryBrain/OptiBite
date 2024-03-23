const joi = require("joi");

const packageSchema = joi.object({
  packageName: joi.string()
    .required(true)
    .min(3),

  image: joi.string().required(true),
});

const packageValidation = (req, res, next) => {
  const packageObject = req.body;
  const { err } = packageSchema.validate(packageObject);
  if (!err) {
    next();
  } else {
    res.json(err.message);
  }
};


module.exports = packageValidation;