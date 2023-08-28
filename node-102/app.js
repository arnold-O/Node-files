const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const tourRoutes = require("./route/tourRoutes");
const userRoutes = require("./route/userRoutes");
const reviewRoutes = require("./route/reviewRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// console.log(process.env)

const app = express();
app.use(express.json({ limit: "10kb" }));

// Global middlewares


// Docs files

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// data sanitization
// app.use(mongoSanitize);
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "difficulty",
      "ratingsAvg",
      "maxGroupSize",
    ],
  })
);

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP please try again in an hour",
});
app.use("/api", limiter);

// ROUTES
app.use("/api/v1/tour", tourRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/review", reviewRoutes);

// Error-handler

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
