const Bootcamp = require("../models/Bootcamp");


exports.createBootcamp = async (req, res) => {
  try {
    const newBootcamp = await Bootcamp.create(req.body);

    res.status(200).json({
      status: "success",
      newBootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  } 
};

exports.getAllBootcamp = async(req, res, next)=>{
  try {
    const allCamps = await Bootcamp.find()

    res.status(200).json({
        nbHits:allCamps.length,
      status: "success",
      allCamps,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};




  

