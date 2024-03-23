const mongoose = require('mongoose')

const productFamilySchema = new mongoose.Schema({
    productFamilyName:{
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
}, {timestamps: true})

module.exports = mongoose.model("ProductFamily", productFamilySchema)