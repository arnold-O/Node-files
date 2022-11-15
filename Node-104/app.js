const express = require("express");
const morgan = require('morgan')
const globalErrorHandler = require("./middlewares/errorController");
const userRoutes = require("./routes/userRoute");

require("dotenv").config();


const app = express();
app.use(morgan('tiny'))

const port = process.env.PORT || 4000;

// DAtabase connection
const connectDB = require("./db/connectDB");

// routes
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("heyyyy uuuu");
});
app.use('/api/v1/user', userRoutes )

app.use(globalErrorHandler)


async function start() {
  try {
    await connectDB(process.env.DATABASE);
    app.listen(port, console.log(`server listening on port ${port}.....`));
  } catch (error) {}
}

start();
