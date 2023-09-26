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

    // dateRelease: {
    //     type: Date,
    //     required: true,
    //     validate: {
    //         validator: (v) => {
    //             if (dateRelease <= 0) {
    //                 return false
    //             }
    //         },
    //         message: 'Error! The date must be valid!'
    //     }
    // },
    songs: {
        titleSong: {type: String},
        duration: {}
    },
    urlAlbum: {}
})

module.exports = mongoose.model("Album Information", Album)