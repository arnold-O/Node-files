const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const bootcamps = require('./routes/bootcamps')
const connectedDB = require('./config/db')

// load env files
dotenv.config({path: './.env'})

// connect to mogoDb
connectedDB()

const app = express()

// dev logging middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps )

const PORT = process.env.PORT || 5000
 const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})


// Handle unhandled promise Rejection

process.on('unhandledRejection', (err, promise)=>{
    console.log(`${err.message}`.red.bold)
    // close and exit process

    server.close(()=>process.exit(1))
})