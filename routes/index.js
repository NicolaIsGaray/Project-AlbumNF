const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const albumRouter = require("./albums");

router.get('/home', async (req, res) => {
    try {
        res.status(200).send(req.body)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.use('/user', userRouter);
router.use('/album', albumRouter);

module.exports = router;