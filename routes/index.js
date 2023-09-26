const user = require("./users")
const albums = require("./albums")

const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    
}

router.use("/users", user)
router.use("/albums", albums)

module.exports = router;