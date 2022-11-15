const mongoose = require('mongoose')



function connectDB (params){
    return mongoose.connect(params);
};




module.exports = connectDB;