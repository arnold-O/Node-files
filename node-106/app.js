const fs = require('fs');
const express = require('express');

const app = express()

app.use(express.json())

const data = JSON.parse(fs.readFileSync(`${__dirname}/data/tour-simple.json`))

app.get('/api/v1/tours', (req, res)=>{
    res.json({
        status:"success",
        numRs:data.length,
        data
    })
        
})
app.post('/api/v1/tours', (req, res)=>{
console.log(req.body)

    res.send('done')
        
})

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`app runing on port ${PORT}`)
})