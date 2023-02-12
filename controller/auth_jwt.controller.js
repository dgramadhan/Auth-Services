const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const auth_config = require("../config/auth.config")
const db = require("../models");
const User = db.Users;

exports.generateToken = async (req, res) => {
    let id = nanoid(16);
    let data = {
        userId: id,
        time: Date()
    }
    let token = jwt.sign(data, auth_config.secret_key, { expiresIn: 86400 });
    res.send({ "status": "success", "token": token });
}

exports.validationToken = async (req, res) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).send({ "status": "gagal", "pesan": "tidak terdapat token" });
        }
        let verified = jwt.verify(token, auth_config.secret_key);
        if (verified) {
            return res.status(200).send({ "status": "success", "pesan": "token terverifikasi", "data": verified });
        }
        return res.status(401).send({ "status": "gagal", "pesan": "akses tidak terotorisasi" });
    } catch {
        return res.status(500).send({ "status": "gagal", "pesan": "terjadi kesalahan" })
    }
}

exports.registerUser = async (req, res) => {
    try {
        var addUser = new User({
            nama: 'TestUsername',
            password: 'TestPassword',
        });

        addUser.save((err) => {
            if (err) {
                return res.status(400).send({ "status" : "gagal", "pesan" : "tidak berhasil registrasi"});
            } else {
                return res.status(200).send({ "status" : "success", "pesan" : "user berhasil didaftarkan"})
            }
        });
    } catch {

    }
}