const joi = require("joi");

// const productSchema = joi.object({
//     productName: joi.string()
//         .max(255)
//         .min(1)
//         .required(true),

//     nepaliName: joi.string()
//         .max(255)
//         .min(1)
//         .required(false),

//     rate: joi.number()
//         .min(1)
//         .required(true),

//     unitType: joi.string()
//         .min(1)
//         .required(true),

//     secondRate: joi.number()
//         .min(1)
//         .required(false),

//     secondUnitType: joi.string()
//         .min(1)
//         .required(false),

//     crossedPrice: joi.number()
//         .min(1)
//         .required(true),

//     stock: joi.string()
//         .valid("InStock", "Out of Stock", "Unavailable")
//         .required(true),

//     organic: joi.string()
//         .valid('Yes', 'No')
//         .required(true),

//     edibleType: joi.string()
//         .valid('Yes', 'No')
//         .required(true),

//     vegNonVeg: joi.string()
//         .valid("veg", "non-veg")
//         .required(true),

//     productDescription: joi.string()
//         .required(true),

//     compare: joi.string(),
// })

const productSchema = joi.object({
  Name: joi.string().max(255).min(1).required(),

  C_Type: joi.string().max(255).min(1).optional(),

  Food_ID: joi.number().min(1).required(),

  Describe: joi.string().min(1).optional(),

  vegNonVeg: joi.string().valid("Non-veg", "Veg").optional(),

  image: joi.array().items(joi.string()).optional(),

  rate: joi.number().min(1).required(),
});
const productValidation = async (req, res, next) => {
  const productObject = req.body;
  const { err } = await productSchema.validate(productObject);
  if (!err) {
    next();
  } else {
    res.status(301).json(err.message);
  }
};

module.exports = productValidation;
