const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bootcamps = require('./routes/bootcamps')

// load env files
dotenv.config({path: './.env'})

const app = express()

// dev logging middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps )

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
})