const mongoose = require('mongoose')
// const dotenv = require('dotenv')

// dotenv.config({path: './.env'})


const connectedDB = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser:true,
        // useCreateIndex:true,
        // useFindAndModify:false,
        // useUnifiedTopology:true
    })
    console.log(`mongoDB connect: ${conn.connection.host}`.green.bold)
}


module.exports = connectedDB