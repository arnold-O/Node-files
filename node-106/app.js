const express = require('express');

const app = express()



app.get('/', (req, res)=>{
    res.status(200).json({
        message:"we live",
        status:"success"
    })

})
app.post('/', (req, res)=>{
    res.status(200).json({
        message:"from post verb",
        status:"success"
    })

})

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`app runing on port ${PORT}`)
})