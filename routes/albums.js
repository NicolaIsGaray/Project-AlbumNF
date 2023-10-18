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

router.put('/editAlbum/:id', async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).send(album)
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

router.get('/albumSelected/:idAlbumSel', async (req, res) => {
    try {
        let select = await Album.find()
        res.status(200).send(select)
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.delete('/album/delete/:idAlbum', async (req, res) => {
    try {
        await Album.findByIdAndDelete(req.params.idAlbum);
        res.status(200).send("Album Deleted Successfully")
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.get('/showSong/:idAlbum', async (req, res) => {
    let idSong = req.query.idSong
    try {
        let albumRes = await Album.find(req.params.idAlbum)
        console.log(albumRes);
        res.status(200).send(albumRes)
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

router.put('/song/add/:idAlbum', async (req, res) => {
    try {
        let song = await Album.findById(req.params.idAlbum);
        song.songs.push(req.body);
        await Album.findByIdAndUpdate(req.params.idAlbum, song, {
            new: true,
        })
        res.status(200).send(song)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/song/remove/:idAlbum', async (req, res) => {
    try {
        let song = await Album.findByIdAndDelete(req.params.idAlbum, req.body);
        res.status(200).send(song)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;