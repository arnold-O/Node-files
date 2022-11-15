const express = require("express");
const globalErrorHandler = require("./middlewares/errorController");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

// DAtabase connection
const connectDB = require("./db/connectDB");

// routes
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("heyyyy uuuu");
});

app.use(globalErrorHandler)


async function start() {
  try {
    await connectDB(process.env.DATABASE);
    app.listen(port, console.log(`server listening on port ${port}.....`));
  } catch (error) {}
}

start();
