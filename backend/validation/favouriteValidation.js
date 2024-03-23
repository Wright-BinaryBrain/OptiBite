const joi = require('joi');

const favouriteSchema = joi.object({
    
});

const favouriteValidation = (req, res, next) => {
    const favouriteObject = req.body
    const {err} = favouriteSchema.validate(favouriteObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};

module.exports = favouriteValidation;
