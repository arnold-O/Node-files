require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express()
app.use(express.json())

const User = require('./models/User')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));






app.post('/register', async (req, res)=>{
    const {firstname, lastname, email, password} = req.body;


    if(!firstname || !lastname || !email || !password){
        res.status(400).json({
            message:"Provide all fields"
        })
    }
    
   const existUser = await User.findOne({email})


   if(existUser){
    res.status(401).json({
        message:"User already exist"
    })

   }


})





module.exports = app