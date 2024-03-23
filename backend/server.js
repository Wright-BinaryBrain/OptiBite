const app = require("./app");
const connectDatabase = require("./config/databaseConnection");

//Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Error", err.stack);
  console.log("Uncaught Exception. Shutting down...");
  process.exit(1);
});

//Setting Config File
require("dotenv").config({ path: "config/config.env" });

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on http://192.168.101.11:` +
      process.env.PORT +
      ` in ` +
      process.env.NODE_ENV +
      ` mode.`
  );
});

//Handle unhandled promise rejections'
process.on("unhandledRejection", (err) => {
  console.log("Error:", err.message);
  console.log("Unhandled promise rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
