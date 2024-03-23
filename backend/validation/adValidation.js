const joi = require('joi');

const adSchema = joi.object({
    adBannerImage: joi.string()
        .required(true),
    
    url: joi.string()
        .required(true)
        .trim(true)
});

const adValidation = (req, res, next) => {
    const adObject = req.body
    const {err} = adSchema.validate(adObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};

module.exports = adValidation;
