const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

// Middleware para verificar JWT
function authenticateToken(req, res, next) {
  // Obtener el token del header Authorization o de las cookies
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // Si no hay token en el header, buscar en cookies (firmadas y no firmadas)
  if (!token) {
    token = req.signedCookies?.jwt_token || req.cookies?.jwt_token;
  }

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("[authMiddleware] Error verificando token:", err.message);
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, JWT_SECRET, JWT_EXPIRES_IN };
