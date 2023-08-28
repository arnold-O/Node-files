const mongoose = require("mongoose");

const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION");

  process.exit(1);
});

const DB = process.env.DATABASE;

mongoose.connect(DB, {}).then((conn) => {
  // console.log(
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLE REJECTION");

  server.close(() => {
    process.exit(1);
  });
});
