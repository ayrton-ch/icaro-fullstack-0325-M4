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
 *               - phone_number
 *               - specialization
 *               - gym_name
 *               - session_price
 *               - certifications
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pedro González
 *               email:
 *                 type: string
 *                 format: email
 *                 example: pedro@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               specialization:
 *                 type: string
 *                 example: "Musculación"
 *               gym_name:
 *                 type: string
 *                 example: "Gimnasio Fit"
 *               session_price:
 *                 type: number
 *                 example: 50
 *               certifications:
 *                 type: string
 *                 example: "Zumba Instructor, Spinning Certified"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
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
 *                 example: pedro@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Datos faltantes
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
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
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
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
 *                 example: Pedro González
 *               email:
 *                 type: string
 *                 format: email
 *                 example: pedro@gmail.com
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
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
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/profile", authenticateToken, AuthController.deleteProfile);

module.exports = router;
