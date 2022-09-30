const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const tourRoutes = require('./route/tourRoutes')


const app = express()
app.use(express.json())








app.use('/api/v1/tour', tourRoutes)









module.exports = app;