const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database").connect();

const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cookieparser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");



app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
app.set("view engine", "ejs");

const User = require("./models/User");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "Provide all fields",
      });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(401).json({
        message: "User already exist",
      });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    const token = jwt.sign(
      { user_id: newUser._id },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "2h" }
    );
    newUser.token = token;
    newUser.password = undefined;

    res.status(201).json({
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fields Missing",
      });
    }

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const passwordChecker = await checkUser.matchPassword(password);
    if (!passwordChecker) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    } else {
      const token = jwt.sign(
        { user_id: checkUser._id, email },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "3d" }
      );
      checkUser.token = token;
      checkUser.password = undefined;

      //   return  res.status(200).json(checkUser)
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        message: "Login Successfully",
        checkUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
app.get("/dash", auth, (req, res) => {
  res.send("Secret path");
});

// file middleware
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/getformdata", async (req, res) => {
  res.send(req.query);

  console.log(req.query);
});
app.post("/postformdata", async (req, res) => {
  // res.send(req.body)

  console.log(req.body);
  console.log(req.files);
  const imageArray = [];

  // multiple Images
  if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      const result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        { folder: "users" }
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }
  // Simple use case
  // let file = req.files.samplefile
  //  let  result = await  cloudinary.uploader.upload(file.tempFilePath, {folder:'users'})
  //  console.log(result)

  const details = {
    firstname: req.body.firstname,
    lastname: req.body.firstname,
    imageArray,
  };
  res.status(201).json(details);
});

// Render form

app.get("/getform", (req, res) => {
  res.render("getform");
});
app.get("/postform", (req, res) => {
  res.render("postform");
});




module.exports = app 
