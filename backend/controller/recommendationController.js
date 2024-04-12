const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const ProductType = require("../Model/ProductType");
const Product = require("../Model/Product");

// exports.postProductType = catchAsyncErrors(async (req, res, next) => {
//   const newProductType = req.body;
//   const productType = await ProductType(newProductType).save();
//   res.status(200).json({
//     success: true,
//     message: "Product Type added successfully!",
//     data: productType,
//   });
// });

exports.getUserOrders = async(req,res)=>{
    const user = req.user;
    if(!user){
        // get most expensive products
        const product = await Product.find().sort({Rate:-1}).limit(1);
        console.log(product);
    }
    // const userOrders = await Order.find({user:user._id}).populate('orderItems.product');
    // res.status(200).json({
    //     success: true,
    //     message: "User Orders fetched successfully!",
    //     data: userOrders,
    // });

    res.status(200).json({
        success: true,
        message: "User Orders fetched successfully!"
    });
}