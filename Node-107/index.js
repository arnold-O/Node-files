const app = require('./app')

const PORT = process.env.PORT ||  5001


app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
})