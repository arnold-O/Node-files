const nodeGeocoder = require('node-geocoder')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})


const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter:'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter:null

}




const geocoder = nodeGeocoder(options)


module.exports =  geocoder