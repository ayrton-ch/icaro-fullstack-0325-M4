const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  loginValidator,
  registerValidator,
} = require("../middlewares/userValidator");

// Rutas públicas

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     description: Crea una nueva cuenta de entrenador personal
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/register", registerValidator, AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autenticación de usuario y generación de token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", loginValidator, AuthController.login);

// Rutas protegidas (requieren autenticación)

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtener perfil del usuario
 *     description: Retorna la información del usuario autenticado
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *       401:
 *         description: No autorizado
 */
router.get("/profile", authenticateToken, AuthController.getProfile);

/**
 * @swagger
 * /auth/profile:
 *   patch:
 *     summary: Actualizar perfil
 *     description: Actualiza la información del usuario autenticado
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Carlos Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juancarlos@example.com
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *       401:
 *         description: No autorizado
 */
router.patch("/profile", authenticateToken, AuthController.updateProfile);

/**
 * @swagger
 * /auth/profile:
 *   delete:
 *     summary: Eliminar perfil
 *     description: Elimina la cuenta del usuario autenticado
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil eliminado exitosamente
 *       401:
 *         description: No autorizado
 */
router.delete("/profile", authenticateToken, AuthController.deleteProfile);

module.exports = router;
