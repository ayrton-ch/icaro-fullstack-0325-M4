const { PersonalTrainer } = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../middlewares/authMiddleware");

// POST /auth/register - Registrar nuevo usuario
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const isHtmlRequest = req.headers["content-type"]?.includes(
      "application/x-www-form-urlencoded"
    );

    // Validar que los campos requeridos estén presentes
    if (!name || !email || !password) {
      if (isHtmlRequest) {
        return res.render("register", {
          title: "Registro",
          error: "Los campos name, email y password son obligatorios",
        });
      }
      return res.status(400).json({
        error: "Los campos name, email y password son obligatorios",
      });
    }

    // Verificar si el email ya existe
    const existingTrainer = await PersonalTrainer.findOne({ where: { email } });
    if (existingTrainer) {
      if (isHtmlRequest) {
        return res.render("register", {
          title: "Registro",
          error: "El email ya está registrado",
        });
      }
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Crear el usuario (la contraseña se hasheará automáticamente por el hook)
    const trainer = await PersonalTrainer.create(req.body);

    // Generar JWT
    const token = jwt.sign(
      { id: trainer.id, email: trainer.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Respuesta para formulario HTML
    if (isHtmlRequest) {
      req.session.token = token;
      const { password: _, ...userData } = trainer.toJSON();
      req.session.user = userData;

      // Guardar token en cookie httpOnly
      res.cookie("jwt_token", token, {
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
      });

      return res.redirect("/");
    }

    // Responder con el usuario (sin la contraseña) y el token para API
    const { password: _, ...trainerData } = trainer.toJSON();

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: trainerData,
    });
  } catch (error) {
    if (
      req.headers["content-type"]?.includes("application/x-www-form-urlencoded")
    ) {
      return res.render("register", {
        title: "Registro",
        error: "Error en el servidor: " + error.message,
      });
    }
    res.status(500).json({ error: error.message });
  }
}

// POST /auth/login - Iniciar sesión
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const isHtmlRequest = req.headers["content-type"]?.includes(
      "application/x-www-form-urlencoded"
    );

    // Validar campos
    if (!email || !password) {
      if (isHtmlRequest) {
        return res.render("login", {
          title: "Bienvenido a Icaro",
          error: "Email y password son obligatorios",
        });
      }
      return res.status(400).json({
        error: "Email y password son obligatorios",
      });
    }

    // Buscar usuario por email
    const trainer = await PersonalTrainer.findOne({ where: { email } });

    if (!trainer) {
      if (isHtmlRequest) {
        return res.render("login", {
          title: "Bienvenido a Icaro",
          error: "Credenciales inválidas",
        });
      }
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const isValidPassword = await trainer.validatePassword(password);

    if (!isValidPassword) {
      if (isHtmlRequest) {
        return res.render("login", {
          title: "Bienvenido a Icaro",
          error: "Credenciales inválidas",
        });
      }
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: trainer.id, email: trainer.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Guardar en sesión y cookie si es request HTML
    if (isHtmlRequest) {
      req.session.token = token;
      const { password: _, ...userData } = trainer.toJSON();
      req.session.user = userData;

      // Guardar token en cookie httpOnly
      res.cookie("jwt_token", token, {
        httpOnly: true,
        signed: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
      });

      return res.redirect("/");
    }

    // Responder con el token y datos del usuario (sin contraseña) para API
    const { password: _, ...trainerData } = trainer.toJSON();

    res.json({
      message: "Login exitoso",
      token,
      user: trainerData,
    });
  } catch (error) {
    if (
      req.headers["content-type"]?.includes("application/x-www-form-urlencoded")
    ) {
      return res.render("login", {
        title: "Bienvenido a Icaro",
        error: "Error en el servidor: " + error.message,
      });
    }
    res.status(500).json({ error: error.message });
  }
}

// GET /auth/profile - Obtener perfil del usuario autenticado
async function getProfile(req, res) {
  try {
    console.log("[getProfile] req.user:", req.user);
    const trainer = await PersonalTrainer.findByPk(req.user.id);

    if (!trainer) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Responder sin la contraseña
    const { password: _, ...trainerData } = trainer.toJSON();
    res.json({ user: trainerData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PATCH /auth/profile - Actualizar perfil del usuario autenticado
async function updateProfile(req, res) {
  try {
    const trainer = await PersonalTrainer.findByPk(req.user.id);

    if (!trainer) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // No permitir cambiar el id
    delete req.body.id;

    await trainer.update(req.body);

    const { password: _, ...trainerData } = trainer.toJSON();
    res.json({
      message: "Perfil actualizado exitosamente",
      user: trainerData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// DELETE /auth/profile - Eliminar cuenta del usuario autenticado
async function deleteProfile(req, res) {
  try {
    const trainer = await PersonalTrainer.findByPk(req.user.id);

    if (!trainer) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await trainer.destroy();

    res.json({ message: "Cuenta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
};
