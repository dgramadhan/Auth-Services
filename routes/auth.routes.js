module.exports = (app) => {
    const auth = require("../controller/auth_jwt.controller");
    var router = require("express").Router();
    var bodyParser = require('body-parser') 

    var jsonParser = bodyParser.json();  

    router.post("/user/generate-token", auth.generateToken);
    router.get("/user/validation-token", auth.validationToken);
    router.post("/user/regis-user", jsonParser, auth.registerUser);
    router.post("/user/login", jsonParser, auth.loginUser)
    app.use("/auth", router)
}