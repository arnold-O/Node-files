const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')
const Bootcamp = require('./models/Bootcamp')

// load env files
dotenv.config({path: './.env'})


mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    // useUnifiedTopology:true
})


// read Json file

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/data/bootcamp.json`, 'utf-8'))


// send or import to data 

const dbImport = async()=>{
    try {
        await Bootcamp.create(bootcamps)
        console.log('data imported')
    } catch (error) {
        console.log(error)
        
    }
}

const dbDelete = async()=>{
    try {
        await Bootcamp.deleteMany()
        console.log('data deleted')

        process.exit()
    } catch (error) {

        console.log(error)
        
    }
}


if(process.argv[2] === '-i'){
    dbImport()

} else if(process.argv[2] === '-d'){
    dbDelete()
}