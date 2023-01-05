const fs = require('fs');
const express = require('express');

const app = express()

const data = JSON.parse(fs.readFileSync(`${__dirname}/data/tour-simple.json`))

app.post('/api/v1/tours', (req, res)=>{
    res.json({
        status:"success",
        data
    })
        
})

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`app runing on port ${PORT}`)
})