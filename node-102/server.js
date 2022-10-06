const mongoose = require("mongoose");

const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE;



mongoose.connect(DB, {}).then((conn) => {
  // console.log(conn.connection);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});

process.on
