const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

// DAtabase connection
const connectDB = require("./db/connectDB")


async function start() {
  try {
    await connectDB(process.env.DATABASE);
    app.listen(port, console.log(`server listening on port ${port}.....`))
  } catch (error) {

  }
}


start()
