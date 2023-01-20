const express = require("express");
const app = express();
const dotenv = require('dotenv');

dotenv.config();

let port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

require("./routes/auth.routes")(app);
require("./routes/content.routes")(app);



