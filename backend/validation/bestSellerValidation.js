const joi = require('joi');

const bestSellerSchema = joi.object({
    
});

const bestSellerValidation = (req, res, next) => {
    const bestSellerObject = req.body
    const {err} = bestSellerSchema.validate(bestSellerObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};

module.exports = bestSellerValidation;
