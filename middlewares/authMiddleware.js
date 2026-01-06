const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

// Middleware para verificar JWT
function authenticateToken(req, res, next) {
  // Obtener el token del header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, JWT_SECRET, JWT_EXPIRES_IN };
