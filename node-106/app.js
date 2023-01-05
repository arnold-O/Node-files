const express = require('express');

const app = express()



app.get('/', ()=>{
    
})

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`app runing on port ${PORT}`)
})