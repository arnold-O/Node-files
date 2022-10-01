const mongoose = require("mongoose");
const Tour = require('../model/tour')
const fs = require('fs')

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB, {}).then((conn) => {
  // console.log(conn.connection);
});

// read file from the data-one.js


const tourFiles = JSON.parse(fs.readFileSync(`${__dirname}/data-one.json`, 'utf-8'))


const importData = async()=>{
  try {
    await Tour.create(tourFiles)
    console.log('data added successfully')
    process.exit()
  } catch (error) {
    console.log(error)
    
  }
}
const deletetData = async()=>{
  try {
    await Tour.deleteMany()
    console.log('data deleted successfully')
    process.exit()
    
  } catch (error) {
    console.log(error)
    
  }
}


if(process.argv[2]=== '--import'){
  importData()
}else if(process.argv[2]=== '--delete'){
  deletetData()
}