const mongoose = require("mongoose");
const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

const userInfo = new mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                if (this.nombre.length < 2) {
                    return false
                }
            },
            message: 'Your name must have at least 2 characters!'
        }
    },
    apellido: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                if (this.apellido.length < 2) {
                    return false
                }
            },
            message: 'Your lastname must have at least 2 characters!'
        }
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