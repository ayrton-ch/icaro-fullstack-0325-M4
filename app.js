// Importamos el framework para crear la aplicación
const express = require("express");
// Creamos la instancia de la aplicación servidor
const app = express();
const cors = require("cors");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public")); // name.jpg

// Ruta raíz: /
app.get("/", function (request, response) {
  response.render("index", { title: "Bienvenido a Icaro" });
});

app.listen(3000);
