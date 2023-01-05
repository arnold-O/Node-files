const express = require('express');

var accountSid = ''; // Your Account SID from www.twilio.com/console
var authToken = '';   // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

const app = express();


app.get('/', (req, res)=>{
    
    sendTextTwilio()

    res.send("<h1>we making it big this year in JESUS name oooooo!!!!!!!1</h1>")
})

const sendTextTwilio = ()=>{
    client.messages.create({
        body: '',
        to: '+2348137764168',
        from: '+19293465601'
     }).then(message => console.log(message))
       // here you can implement your fallback code
       .catch(error => console.log(error))
}



const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
})
