const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')
const User = require('./models/User')
const Review = require('./models/Review')

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
const courses = JSON.parse(fs.readFileSync(`${__dirname}/data/courses.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'))
const review = JSON.parse(fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8'))


// send or import to data 

const dbImport = async()=>{
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        await User.create(users)
        await Review.create(review)
        console.log('data imported')
    } catch (error) {
        console.log(error)
        
    }
}

const dbDelete = async()=>{
    try {
        await Bootcamp.deleteMany()
        await Course.deleteMany()
        await User.deleteMany()
        await Review.deleteMany()
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