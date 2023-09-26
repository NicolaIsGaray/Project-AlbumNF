const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const url = "mongodb+srv://nicogaray2713:Facunico1104@intro.f8ceic4.mongodb.net/?retryWrites=true&w=majority"

const routes = require("./routes/index");

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes)

const connectMongo = async() => {
    try {
        await mongoose.connect(url);
        app.listen(5000, () => {
            console.log("Esta levantado en el puerto 5000 y conectado a la base de datos.");
        })

    } catch (error) {
        console.log(error);
    }
}

connectMongo()