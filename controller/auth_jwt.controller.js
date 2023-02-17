const { nanoid } = require('nanoid');
const db = require("../models");
const User = db.Users;
const authJwt = require("../helpers/auth_jwt.helpers")


exports.generateToken = async (req, res) => {
    let id = nanoid(16);
    let data = {
        userId: id,
        time: Date()
    }
    res.send({ "status": "success", "token": authJwt.generateToken(data) });
}

exports.validationToken = async (req, res) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).send({ "status": "gagal", "pesan": "tidak terdapat token" });
        }
        let verified = authJwt.validationToken(token)
        if (verified) {
            return res.status(200).send({ "status": "success", "pesan": "token terverifikasi", "data": verified });
        }
        return res.status(401).send({ "status": "gagal", "pesan": "akses tidak terotorisasi" });
    } catch {
        return res.status(500).send({ "status": "gagal", "pesan": "terjadi kesalahan" })
    }
}

exports.registerUser = (req, res) => {
    try {
        var addUser = new User({
            nama: req.body.nama,
            password: req.body.password,
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

exports.loginUser = async (req,res) => {
    try {
        var addUser = {
            nama: req.body.nama,
            password: req.body.password,
        };

        const userCheck =  await User.findOne({
            nama: addUser.nama,
            password: addUser.password
        }, '_id nama');
        
        if (userCheck != null) {
            return res.status(200).send({ "status" : "success", 
                "pesan" : "berhasil login", 
                "token" : authJwt.generateToken(userCheck)});
        } else {
            return res.status(400).send({ "status" : "gagal", "pesan" : "gagal login"});
        }
    } catch (err) {
        if (err) {
            return res.status(400).send({ "status" : "gagal", "pesan" : "gagal login " + err});
        } 
    }
}