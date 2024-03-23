const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({    
    categoryName:{
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);