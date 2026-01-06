// Importamos el framework para crear la aplicación
const express = require("express");
// Creamos la instancia de la aplicación servidor
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const TrainerController = require("./controllers/TrainerController");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public")); // name.jpg
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Ruta raíz: /
app.get("/", function (request, response) {
  response.render("index", { title: "Bienvenido a Icaro" });
});

// Trainer
app.get("/trainers", TrainerController.index);
app.get("/trainers/:id", TrainerController.show);
app.post("/trainers", TrainerController.create);
app.patch("/trainers/:id", TrainerController.update);
app.delete("/trainers/:id", TrainerController.destroy);

app.listen(3000);
