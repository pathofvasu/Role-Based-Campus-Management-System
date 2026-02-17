const jwt = require("jsonwebtoken");

// Verify JWT token
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

// Role-based access
function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No token, access denied" });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

module.exports = { authMiddleware, roleMiddleware };
