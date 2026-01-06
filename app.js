// Importamos el framework para crear la aplicación
const express = require("express");
// Creamos la instancia de la aplicación servidor
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");

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

// Rutas de autenticación (públicas y protegidas)
app.use("/auth", authRoutes);

// Rutas de trainers
app.use("/trainers", trainerRoutes);

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Error interno del servidor",
    message: err.message 
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
