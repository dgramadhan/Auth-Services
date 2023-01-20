module.exports = (app) => {
    const content = require("../controller/content.controller");
    const verifyJwt = require("../middleware/auth_jwt.middleware");
    var router = require("express").Router();

    router.get("/welcome", verifyJwt.verifyToken, content.welcomeContent);
    app.use("/content", router)
}