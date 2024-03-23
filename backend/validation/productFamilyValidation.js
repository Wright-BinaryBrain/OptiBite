const joi = require('joi');

const productFamilySchema = joi.object({
    productFamilyName: joi.string()
        .required(true)
        .min(3),
});

const productFamilyValidation = (req, res, next) => {
    const productFamilyObject = req.body
    const {err} = productFamilySchema.validate(productFamilyObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
}


module.exports = productFamilyValidation;