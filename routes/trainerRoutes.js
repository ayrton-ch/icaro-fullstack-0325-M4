const express = require("express");
const router = express.Router();
const TrainerController = require("../controllers/TrainerController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Rutas CRUD con autenticación JWT

/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Obtener todos los entrenadores
 *     description: Retorna la lista completa de entrenadores personales
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entrenadores obtenida exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.get("/", authenticateToken, TrainerController.index);

/**
 * @swagger
 * /trainers/{id}:
 *   get:
 *     summary: Obtener entrenador por ID
 *     description: Retorna la información de un entrenador específico
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenador
 *     responses:
 *       200:
 *         description: Entrenador obtenido exitosamente
 *       404:
 *         description: Entrenador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get("/:id", authenticateToken, TrainerController.show);

/**
 * @swagger
 * /trainers:
 *   post:
 *     summary: Crear nuevo entrenador
 *     description: Crea un nuevo entrenador personal
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
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
 *         description: Entrenador creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authenticateToken, TrainerController.create);

/**
 * @swagger
 * /trainers/{id}:
 *   patch:
 *     summary: Actualizar entrenador
 *     description: Actualiza la información de un entrenador existente
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               specialty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entrenador actualizado exitosamente
 *       404:
 *         description: Entrenador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.patch("/:id", authenticateToken, TrainerController.update);

/**
 * @swagger
 * /trainers/{id}:
 *   delete:
 *     summary: Eliminar entrenador
 *     description: Elimina un entrenador del sistema
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del entrenador
 *     responses:
 *       200:
 *         description: Entrenador eliminado exitosamente
 *       404:
 *         description: Entrenador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authenticateToken, TrainerController.destroy);

module.exports = router;
