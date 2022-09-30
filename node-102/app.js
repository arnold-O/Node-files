const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


const app = express()








app.get('/', (req, res)=>{




    res.status(200).json({
        msg:"hello"
    })
})









module.exports = app;