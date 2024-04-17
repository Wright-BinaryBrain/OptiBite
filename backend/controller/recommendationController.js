const axios = require("axios");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

const Product = require("../Model/Product");
const Order = require("../Model/Order");

exports.getUserOrders = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      // get most expensive products
      const product = await Product.find().sort({ Rate: -1 }).limit(1);
      const name = product[0].Name.replace(/ /g, "%20");
  
      const recommendation = await axios.get(`http://3.19.255.251/rec/${name}`);
      // console.log();
      return res.status(200).json({
        success: true,
        message: "User Orders fetched successfully!",
        data: recommendation.data.items,
      });
    } else {
      // get user orders
      const userOrders = await Order.find({ user: user._id }).populate(
        "productId"
      );
      console.log(userOrders);
      //loop through products and get recommendations
      const recs = [];
      for (let i = 0; i < userOrders.length; i++) {
        const response = await axios.get(
          `http://3.19.255.251/rec/${userOrders[i].productId[0].Name}`
        );
        for (let j = 0; j < response.data.items.length; j++) {
          recs.push(response.data.items[j]);
        }
      }
      return res.status(200).json({
        success: true,
        message: "User Orders fetched successfully!",
        data: recs,
      });
    }
    
  } catch (error) {
    const recommendation = await axios.get(`http://3.19.255.251/rec/malabar%20fish%20curry`);
    return res.status(200).json({
      success: true,
      message: "User Orders fetched successfully!",
      data: recommendation.data.items,
    });
  }
};
