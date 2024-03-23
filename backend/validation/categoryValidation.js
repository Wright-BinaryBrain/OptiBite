const joi = require('joi');

const categorySchema = joi.object({
    categoryName: joi.string()
        .required(true)
        .min(3)
});

const categoryValidation = (req, res, next) => {
    const categoryObject = req.body
    const {err} = categorySchema.validate(categoryObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};

module.exports = categoryValidation;
