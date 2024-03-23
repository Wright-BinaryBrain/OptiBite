const joi = require('joi');

const guestSchema = joi.object({
    guestName: joi.string()
        .required(true)
        .min(3)
        .max(255),

    contactNo: joi.string()
        .required(true)
        .max(10)
        .min(10)
});

const guestValidation = (req, res, next) => {
    const guestObject = req.body
    const {err} = guestSchema.validate(guestObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};


module.exports = guestValidation;