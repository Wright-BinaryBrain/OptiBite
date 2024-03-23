const joi = require('joi');

const userSchema = joi.object({
    name: joi.string()
        .max(45)
        .required(true),
    
    email: joi.string()
        .required(true)
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: joi.string()
        .required(true)
        .min(8)
        .required(true)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    contactNo1: joi.string()
        .required(true)
        .max(10)
        .min(10)
        .pattern(/^[0-9]+$/),

    contactNo2: joi.string()
        .required(false)
        .max(10)
        .min(10)
        .pattern(/^[0-9]+$/),
        
    role: joi.string()
        .valid('admin', 'superAdmin', 'customer'),

    address: joi.string()
        .required(false),

    
})

const userValidation = (req, res, next) => {
    const userObject = req.body
    const{err} = userSchema.validate(userObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
}

module.exports = userValidation;

    