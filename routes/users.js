const express = require("express");
const User = require("../models/User");
const router = express.Router();

const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotEnv = require("dotenv");
dotEnv.config()

const scrtW = process.env.SECRET_WORD

const saltRounds = 10;
const secretW = scrtW;

const hashPassword = async (password) => {
    const hash = await bCrypt.hash(password, saltRounds);
    return hash
}

router.post('/signUp', async (req, res) => {
    const {password, email, nombre, apellido} = req.body
    const hashed = await hashPassword(password);
    const user = {
        password: hashed,
        email,
        nombre,
        apellido
    }

    try {
        let newUser = await User.create(user);
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error);
    }
    
})

router.post('/logIn', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email: email});
        const match = bCrypt.compare(password, user.password);
        const payload = {email, nombre: user.nombre, apellido: user.apellido};
        if (match) {
            const token = jwt.sign(payload, secretW);
            res.cookie("token", token);
            res.status(200).send(payload)
        }
    } catch (error) {
        res.status(401).send({message: error.message})
    }
})

router.post('/logOut', async (req, res) => {
    try {
        res.clearCookie("token");
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
})

router.get('/data/:id', async (req, res) => {
    try {
        let answer = await User.findById(req.params.id)
        res.status(200).send({user: {name: answer.name,
             apellido: answer.apellido,
              email: answer.email}})
    } catch (error) {
        res.status(500).send(console.log("Error."))
    }
})

router.put('/userEdit/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token, secretW);
        res.send(payload)
    } catch (error) {
        res.status(401).send(error.message);
    }
})

module.exports = router