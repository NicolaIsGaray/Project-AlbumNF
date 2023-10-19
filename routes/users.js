const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get('/me', async (req, res) => {
    
})

router.post('/users/signUp', async (req, res) => {
    const {password, email, nombre, apellido} = req.body
    console.log(req.body);
    const user = {
        password:
        email,
        nombre,
        apellido
    }

    try {
        let newUser = await User.create(req.body);
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error);
    }
    
})

router.get('/users/userData/:id', async (req, res) => {
    try {
        let answer = await User.findById(req.params.id)
        res.status(200).send({user: {name: answer.name,
             apellido: answer.apellido,
              email: answer.email}})
    } catch (error) {
        res.status(500).send(console.log("Error."))
    }
})

router.put('/users/userEdit/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send("Error. Cannot process.")
    }
})

module.exports = router