const mongoose = require("mongoose");
const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

const userInfo = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
      required: true,
      validate: {
        validator: function(v) {
          return regex.test(v);
        },
        message:'You must enter a valid email!'
      },
    },
    password: { type: String, required: true, min: 8},
    favoritesAlbums: {}
})

module.exports = mongoose.model("User Information", userInfo)