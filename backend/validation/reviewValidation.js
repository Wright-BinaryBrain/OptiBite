const joi = require('joi');

const reviewSchema = joi.object({
    userReview: joi.string()
        .max(255)
        .min(1),
    
    rating: joi.number()
        .valid("1","2","3","4","5")
});

const reviewValidation = (req, res, next) => {
    const reviewObject = req.body
    const {err} = reviewSchema.validate(reviewObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};

module.exports = reviewValidation