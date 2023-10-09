const mongoose = require("mongoose");
const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

const userInfo = new mongoose.Schema ({
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
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
    password: { type: String},
    favoritesAlbums: {}
})

module.exports = mongoose.model("User Information", userInfo)