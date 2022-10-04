const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const tourRoutes = require("./route/tourRoutes");

const app = express();
app.use(express.json());

// ROUTES
app.use("/api/v1/tour", tourRoutes);

// Error-handler
app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `can't find ${req.originalUrl} on this server`,
//   });
const err = new Error(`can't find ${req.originalUrl} on this server`)
next(err)
});

app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status:err.status,
    message:err.message,
  });
});

module.exports = app;
