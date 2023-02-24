const jwt = require('jsonwebtoken');
const auth_config = require("../config/auth.config");

exports.generateToken = (data) => {
    let token = jwt.sign({data: data}, auth_config.secret_key, { expiresIn: 86400 });
    return token
}

exports.validationToken = (token) => {
    let verified = jwt.verify(token, auth_config.secret_key);
    return verified
}

exports.validationUserVerif = (data) => {
    let token = jwt.sign({data: data}, auth_config.user_verif_key, {expiresIn: 86400})
    return token
}

exports.verifyUser = (token) => {
    let verified = jwt.verify(token, auth_config.user_verif_key)
    return verified
}
