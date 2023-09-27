const express = require("express");
const router = express.Router();
const Album = require("../models/Album");

router.post('/albums/addAlbum', async (req, res) => {
    try {
        let album = await Album.create(req.body)
        res.status(201).send(album)
    } catch (error) {
        res.status(500).send(album)
    }
})

router.get('/albums/editAlbum', async (req, res) => {
    try {
        res.status(200).send("Edit Album Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/albums/albumModifySong', async (req, res) => {
    try {
        res.status(200).send("Modify Song Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/albums/allAlbums', async (req, res) => {
    try {
        let albumRes = await Album.find()
        console.log(albumRes);
        res.status(200).send(albumRes)
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/albums/albumSelected', async (req, res) => {
    try {
        res.status(200).send("Selected Album Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/albums/albumDelete', async (req, res) => {
    try {
        res.status(200).send("Delete Album Route Working")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

module.exports = router