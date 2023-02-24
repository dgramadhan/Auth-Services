const { nanoid } = require('nanoid');
const db = require("../models");
const User = db.Users;
const authJwt = require("../helpers/auth_jwt.helpers")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");

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


let generateEmail = async (emailUser, idUser) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user : process.env.EMAIL,
            pass: process.env.PASS_EMAIL
        }
    })

    let verificationToken = await authJwt.validationUserVerif(idUser);
    let url = `http://localhost:5000/auth/user/verify/${verificationToken}`

    let mailOptions = {
        from: process.env.EMAIL,
        to: emailUser,
        subject: 'Verification Email',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
      };

    try {
        let sendEmail = await transporter.sendMail(mailOptions);

        if (sendEmail) {
            console.log('Email sent: ' + sendEmail.messageId);
            // return res.status(200).send({ "status" : "success", })
        }
    } catch (error) {
        console.log('Email sent: ' + error);
        // return res.status(200).send({ "status" : "gagal", })
    }

}

exports.registerUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt)
        var addUser = new User({
            nama: req.body.nama,
            email : req.body.email,
            password: passwordHash
        });

        let verifEmail = await generateEmail(addUser.email, addUser._id)

        addUser.save((err) => {
            if (err) {
                return res.status(400).send({ "status" : "gagal", "pesan" : "tidak berhasil registrasi"});
            } else {
                verifEmail
                return res.status(200).send({ "status" : "success", "pesan" : "user berhasil didaftarkan silahkan cek email untuk verifikasi"})
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
        });

        if (userCheck != null) {
            const compare = await bcrypt.compare(req.body.password, userCheck.password);
            if (compare) {
                return res.status(200).send({ "status" : "success", 
                "pesan" : "berhasil login", 
                "token" : authJwt.generateToken(userCheck)});
            } else {
                return res.status(400).send({ "status" : "gagal", "pesan" : "gagal login"});
            }
        } else {
            return res.status(400).send({ "status" : "gagal", "pesan" : "gagal login"});
        }
    } catch (err) {
        if (err) {
            return res.status(400).send({ "status" : "gagal", "pesan" : "gagal login " + err});
        } 
    }
}

exports.verifyEmail = async (req, res) => {
    let token = req.params
    let payload = authJwt.verifyUser(token.id)
    let update = { verified: true}

    if (!token) {
        return res.status(422).send({ "status" : "gagal", "pesan" : "missing token"})
    }

    try {
        let user = await User.findOneAndUpdate({
            _id : payload.data
        }, update)

        if(!user) {
            return res.status(404).send({ "status" : "gagal", "pesan" : "user tidak ditemukan"})
        }

        return res.status(404).send({ "status" : "berhasil", "pesan" : "user sudah di verifikasi"})

    } catch (error) {
        console.log(error)
    }
}
