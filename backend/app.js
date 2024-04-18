const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");

var corsOptions = {
  origin: "http://127.0.0.1:4000",
  credentials: true,
};
app.use(cors(corsOptions));

// const __dirname = path.dirname("")
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));
console.log(__dirname);

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
const order = require("./router/orderRoute");
const product = require("./router/productRoute");
const user = require("./router/userRoute");
const recommendation = require("./router/recommendationRouter");
const schedule = require("./router/scheduleOrderRouter");

//Using Routers
app.use("/api/v1/", auth, order, product, user, recommendation, schedule);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        // res.status(500).send(err);
        console.log(err);
      }
    }
  );
});

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
