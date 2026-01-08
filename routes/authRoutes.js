const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  loginValidator,
  registerValidator,
} = require("../middlewares/userValidator");

// Rutas públicas
router.post("/register", registerValidator, AuthController.register);
router.post("/login", loginValidator, AuthController.login);

// Rutas protegidas (requieren autenticación)
router.get("/profile", authenticateToken, AuthController.getProfile);
router.patch("/profile", authenticateToken, AuthController.updateProfile);
router.delete("/profile", authenticateToken, AuthController.deleteProfile);

module.exports = router;
