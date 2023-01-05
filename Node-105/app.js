const express = require('express');

var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

const app = express();

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`PORTapp running on port ${PORT}`)
})

