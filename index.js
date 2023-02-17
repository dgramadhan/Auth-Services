const express = require("express");
const app = express();
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
dotenv.config();

const dbConn = require("./models")

let port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

dbConn.mongoose
  .connect(dbConn.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./routes/auth.routes")(app);
require("./routes/content.routes")(app);
