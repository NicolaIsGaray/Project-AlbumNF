const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const dbPass = process.env.MONGO_PASS;
const dbUser = process.env.MONGO_USER;

const url = `mongodb+srv://${dbUser}:${dbPass}@intro.f8ceic4.mongodb.net/?retryWrites=true&w=majority`

const routes = require("./routes/index");

app.use(express.json())
app.use(
    express.static("public", {
      setHeaders: (res, path) => {
        if (path.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        }
      },
    }),
  );
app.use('/', routes);

const connectMongo = async() => {
    try {
        await mongoose.connect(url);
        app.listen(5000, () => {
            console.log(`Esta levantado en el puerto ${PORT} y conectado a la base de datos.`);
        })

    } catch (error) {
        console.log(error);
    }
}

connectMongo()