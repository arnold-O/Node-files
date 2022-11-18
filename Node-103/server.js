const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/course')
const auth = require('./routes/auth')
const user = require('./routes/users')
const review = require('./routes/review')
const mongoSanitize = require('express-mongo-sanitize')
const connectedDB = require('./config/db')
const errorHandler = require('./middleware/error')

// load env files
dotenv.config({path: './.env'})

// connect to mogoDb
connectedDB()

const app = express()

app.use(express.json())
// Cookie-parser
app.use(cookieParser())

// dev logging middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

// file upload
app.use(fileupload())

// mongo Sanitize
app.use(mongoSanitize())

// static files
app.use(express.static(path.join(__dirname, 'public')))

// mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', user)
app.use('/api/v1/review', review)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

 const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})


// Handle unhandled promise Rejection

process.on('unhandledRejection', (err)=>{
    console.log(`${err.message}`.red.bold)
    
    server.close(()=>process.exit(1))
})

