const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const tourRoutes = require("./route/tourRoutes");
const userRoutes = require("./route/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// console.log(process.env)

const app = express();
app.use(express.json());

// ROUTES
app.use("/api/v1/tour", tourRoutes);
app.use("/api/v1/user", userRoutes);

// Error-handler

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
