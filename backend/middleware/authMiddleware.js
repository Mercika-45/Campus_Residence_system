import jwt from "jsonwebtoken";

// =======================
// Protect Route
// =======================
export const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );

    req.user = decoded; // user info from token
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// =======================
// Role Based Authorization
// =======================
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};