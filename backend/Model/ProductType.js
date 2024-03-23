const mongoose = require('mongoose')
const ProductFamily = require('./ProductFamily')

const productTypeSchema = new mongoose.Schema({     //egg, curd, milk, potato, chicken
    productTypeName:{
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
   
    productFamilyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductFamily",
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("ProductType", productTypeSchema)