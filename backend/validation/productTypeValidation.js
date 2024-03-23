const joi = require('joi');

const productTypeSchema = joi.object({
    productTypeName: joi.string()
        .required(true)
        .min(3),
});

const productTypeValidation = (req, res, next) => {
    const productTypeObject = req.body
    const {err} = productTypeSchema.validate(productTypeObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};


module.exports = productTypeValidation;