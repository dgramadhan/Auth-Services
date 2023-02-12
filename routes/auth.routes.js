module.exports = (app) => {
    const auth = require("../controller/auth_jwt.controller");
    var router = require("express").Router();

    router.post("/user/generate-token", auth.generateToken);
    router.get("/user/validation-token", auth.validationToken);
    router.get("/user/regis-user", auth.registerUser);
    app.use("/auth", router)
}