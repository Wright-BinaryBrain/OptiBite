const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

var corsOptions = {
  //   origin: "*",
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errors");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("files/image"));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Import Routes
const auth = require("./router/authorizeRoute");
const category = require("./router/categoryRoute");
const favourite = require("./router/favouriteRouter");
const order = require("./router/orderRoute");
const product = require("./router/productRoute");
const productType = require("./router/productTypeRouter");
const user = require("./router/userRoute");
const dashboard = require("./router/dashboardRouter");
const recommendation = require("./router/recommendationRouter");
const schedule = require("./router/scheduleOrderRouter");

//Using Routers
app.use(
  "/api/v1/",
  auth,
  category,
  favourite,
  order,
  product,
  productType,
  user,
  dashboard,
  recommendation,
  schedule
);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
