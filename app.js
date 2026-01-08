// Importamos el framework para crear la aplicación
const express = require("express");
// Creamos la instancia de la aplicación servidor
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const logger = require("./config/logger");

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// middlewares
app.use(cors({ origin: "http://localhost:" + process.env.PORT }));
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
app.get("/", function (req, res) {
  const user = req.session.user;
  logger.info("Usuario en sesión:", user);
  console.log(user);
  res.render("login", {
    title: "Bienvenido a Icaro",
    user: user || null,
  });
});

// Ruta de registro: /register
app.get("/register", function (req, res) {
  const user = req.session.user;
  res.render("register", {
    title: "Registro",
    user: user || null,
  });
});

// Ruta para ver el perfil del usuario
app.get("/profile", function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/");
  }
  res.render("profile");
});

// Ruta para cerrar sesión
app.get("/logout", function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    res.clearCookie("connect.sid"); // Limpiar cookie explícitamente
    res.clearCookie("jwt_token"); // Limpiar cookie JWT
    res.redirect("/");
  });
});

// Rutas de autenticación (públicas y protegidas)
app.use("/auth", authRoutes);

// Rutas de trainers
app.use("/trainers", trainerRoutes);

// middleware de manejo de errores global
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Error interno" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en http://localhost:${PORT}`);
});
