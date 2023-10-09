const express = require("express");
const router = express.Router();
const Album = require("../models/Album");

router.post('/addAlbum', async (req, res) => {
    const {title, description, dateRelease, songs, urlAlbum} = req.body
    console.log(req.body);
    const album = {
        title,
        description,
        dateRelease,
        songs,
        urlAlbum
    }
    try {
        const album = await Album.create(req.body)
        res.status(201).send(album)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/editAlbum', async (req, res) => {
    try {
        res.status(200).send("Edit Album Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/albumModifySong', async (req, res) => {
    try {
        res.status(200).send("Modify Song Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/showAlbums', async (req, res) => {
    try {
        let albumRes = await Album.find()
        console.log(albumRes);
        res.status(200).send(albumRes)
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/albumSelected', async (req, res) => {
    try {
        res.status(200).send("Selected Album Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/albumDelete', async (req, res) => {
    try {
        res.status(200).send("Delete Album Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

module.exports = router;