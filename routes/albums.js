const express = require("express");
const router = express.Router();
const Album = require("../models/Album");

//[FUNCIONAL]
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
        const album = await Album.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })
        res.status(200).send(album)
    } catch (error) {
        res.status(500).send(error)
    }
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

//[FUNCIONAL]
router.get('/showAlbums', async (req, res) => {
    try {
        let albumRes = await Album.find()
        console.log(albumRes);
        res.status(200).send(albumRes)
    } catch (error) {
        res.status(500).send("Error:", error)
    }
})

//[FUNCIONAL]
router.get('/selected/:idAlbumSel', async (req, res) => {
    try {
        let select = await Album.findById(req.params.idAlbumSel)
        if (!select) {
            return res.status(404).json({ error: 'Album not found' });
        }
        res.status(200).send(select)
    } catch (error) {
        res.status(500).send("Error")
    }
})

router.delete('/delete/:idAlbum', async (req, res) => {
    try {
        await Album.findByIdAndDelete(req.params.idAlbum);
        res.status(204).send("Album Deleted Successfully")
    } catch (error) {
        res.status(500).send("Error")
    }
})

router.get('/showSongs/:idAlbum', async (req, res) => {
    try {
        const albumId = req.params.idAlbum;
        const album = await Album.findById(albumId);

        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        const songs = album.songs; // Supongamos que 'songs' es un arreglo de canciones dentro del álbum
        res.status(200).json({ songs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/song/add/:idAlbum', async (req, res) => {
    try {
        const albumId = req.params.idAlbum;
        const songData = req.body;

        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        album.songs.push(songData);
        const updatedAlbum = await album.save();

        res.status(200).json({ album: updatedAlbum });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/song/remove/:idAlbum', async (req, res) => {
    let idSong = req.query.idSong;
    try {
        let album = await Album.findById(req.params.idAlbum, req.body);
        let albumUpdated = album.songs.filter((song) => song._id != idSong);

        album.songs = albumUpdated;
        await Album.findByIdAndUpdate(req.params.idAlbum, album, {
            new: true,
        })
        res.status(200).send({message: "Cancion Eliminada Correctamente."})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;