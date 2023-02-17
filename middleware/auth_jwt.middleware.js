const authJWT = require("../helpers/auth_jwt.helpers")

exports.verifyToken = async (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).send({"status": "gagal", "pesan": "tidak terdapat token"});
        }
        let verified = authJWT.validationToken(token);
        if (!verified) {
            return res.status(401).send({"status": "gagal", "pesan": "akses tidak terotorisasi"});    
        }
        next();
        
    } catch {
        return res.status(500).send({"status": "gagal", "pesan": "terjadi kesalahan"})
    }
}