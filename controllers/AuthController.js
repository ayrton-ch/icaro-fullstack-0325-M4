const { PersonalTrainer } = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../middlewares/authMiddleware");

// POST /auth/register - Registrar nuevo usuario
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Los campos name, email y password son obligatorios",
      });
    }

    // Verificar si el email ya existe
    const existingTrainer = await PersonalTrainer.findOne({ where: { email } });
    if (existingTrainer) {
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

    // Responder con el usuario (sin la contraseña) y el token
    const { password: _, ...trainerData } = trainer.toJSON();

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: trainerData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /auth/login - Iniciar sesión
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        error: "Email y password son obligatorios",
      });
    }

    // Buscar usuario por email
    const trainer = await PersonalTrainer.findOne({ where: { email } });

    if (!trainer) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar contraseña
    const isValidPassword = await trainer.validatePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: trainer.id, email: trainer.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Responder con el token y datos del usuario (sin contraseña)
    const { password: _, ...trainerData } = trainer.toJSON();

    res.json({
      message: "Login exitoso",
      token,
      user: trainerData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /auth/profile - Obtener perfil del usuario autenticado
async function getProfile(req, res) {
  try {
    const trainer = await PersonalTrainer.findByPk(req.user.id);

    if (!trainer) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Responder sin la contraseña
    const { password: _, ...trainerData } = trainer.toJSON();
    res.json(trainerData);
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
