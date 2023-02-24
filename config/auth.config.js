module.exports = {
    secret_key: process.env.JWT_SECRET_KEY,   
    url_mongo: process.env.SERVER_MONGO,
    user_verif_key: process.env.USER_VERIFICATION_SECRET
}