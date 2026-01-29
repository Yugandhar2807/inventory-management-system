import jwt from "jsonwebtoken";
const JWT_SECRET = "super_secret_change_me"; // same as in authController

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // attach user info to request
    next();
  });
}

export default authMiddleware;