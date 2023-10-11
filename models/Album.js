const mongoose = require("mongoose");

const Album = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        min: [5, "Must require the min characters length."],
        max: [200, "Must respect the max characters length."]
        },

    dateRelease: {
        type: Date,
        required: true,
    },
    songs: [
        {
            titleSong: {type: String},
            duration: {},
            link: {type: String}
        }
    ],
    urlAlbum: {type: String}
})

module.exports = mongoose.model("Album Information", Album)