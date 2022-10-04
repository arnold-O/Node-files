const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const tourRoutes = require('./route/tourRoutes')


const app = express()
app.use(express.json())






// ROUTES
app.use('/api/v1/tour', tourRoutes)


// Error-handler
app.all('*', (req, res, next)=>{
    res.status(404).json({
        status:'fail',
        message:`can't find ${req.originalUrl} on this server`
    })
})


app.use((err, req, res, next)=>{

    res.status(200).json({
        
    })
})






module.exports = app;