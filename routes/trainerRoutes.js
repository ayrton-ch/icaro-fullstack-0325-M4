const express = require("express");
const router = express.Router();
const TrainerController = require("../controllers/TrainerController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Rutas CRUD con autenticación JWT
router.get("/", authenticateToken, TrainerController.index);
router.get("/:id", authenticateToken, TrainerController.show);
router.post("/", authenticateToken, TrainerController.create);
router.patch("/:id", authenticateToken, TrainerController.update);
router.delete("/:id", authenticateToken, TrainerController.destroy);

module.exports = router;
