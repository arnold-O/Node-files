const mongoose = require('mongoose')


const mongoURL = process.env.DATABASE;


exports.connect =()=>{
    mongoose.connect(mongoURL,{

    }).then(
        console.log('Database connected successfully')
    
    ).catch(error =>{
        console.log('Database connection failed')
        process.exit(1)
    })
}