require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const fileupload = require('express-fileupload')
const cookieparser = require('cookie-parser')
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));
app.use(fileupload({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}))
app.set('view engine', 'ejs')

const User = require("./models/User");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/register", async (req, res) => {
 try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
    return   res.status(400).json({
        message: "Provide all fields",
      });
    }
  
    const existUser = await User.findOne({ email });
  
    if (existUser) {
    return   res.status(401).json({
        message: "User already exist",
      });
    }
  
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });
  
        const token = jwt.sign({user_id :newUser._id}, process.env.SECRET_KEY_JWT ,{expiresIn:"2h"})
        newUser.token = token;
        newUser.password = undefined;

    res.status(201).json({
      newUser
    });
    
 } catch (error) {

    console.log(error)
    
 }
});


app.post('/login', async(req, res)=>{
    try {
        const {email, password} = req.body


        if(!email || !password){
            return res.status(400).json({
                message:"Fields Missing"
            })
        }

       const checkUser = await User.findOne({email})

       if(!checkUser){
       
         return res.status(400).json({
            message:"User does not exist"
        })
       }


      const passwordChecker = await checkUser.matchPassword(password)
      if(!passwordChecker){
        return res.status(400).json({
            message:"Invalid credentials"
        })

      }else{
        const token = jwt.sign({user_id: checkUser._id, email}, process.env.SECRET_KEY_JWT, {expiresIn:"3d"})
        checkUser.token = token;
        checkUser.password = undefined;

    //   return  res.status(200).json(checkUser)
    const options = {
        expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly:true
    }
            res.status(200).cookie('token', token, options).json({
                message:"Login Successfully",
                checkUser
            })
      }

        
    } catch (error) {

        console.log(error)
        
    }
})
app.get('/dash', auth, (req, res)=>{

    res.send('Secret path')

})


app.get('/getformdata', (req, res)=>{
  res.send(req.query)

  console.log(req.query)
})
app.post('/postformdata', (req, res)=>{
  res.send(req.body)

  console.log(req.body)
  console.log(req.files)
})

// Render form

app.get('/getform', (req, res)=>{
   res.render('getform')
})
app.get('/postform', (req, res)=>{
   res.render('postform')
})

module.exports = app;
