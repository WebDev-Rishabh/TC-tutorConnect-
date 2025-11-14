// src/server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // ✅ Check if token is provided in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user details from DB
      req.user = await User.findById(decoded.id).select("-password");

      // If no user found
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next(); // ✅ Proceed to controller
    } catch (error) {
      console.error("Auth error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
// ✅ Main authentication middleware
export const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization || req.headers.Authorization;
  try {
    // Get the Authorization header (case-insensitive)
    let token = req.headers.authorization || req.headers.Authorization;

    console.log("🟠 Raw Authorization Header:", token);
    console.log("🧩 All headers:", req.headers);

    // No token at all
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // If token starts with "Bearer", remove the prefix
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1].trim();
    }

    console.log("🟢 Final token being verified:", token);

    // Verify secret exists
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET missing from .env");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Decode the JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ authMiddleware error:", err.message);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
};

// ✅ Lightweight token verifier (for minimal auth check)
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers.Authorization;

    console.log("🟠 Raw Authorization Header (verifyToken):", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1].trim();
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET missing from .env");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: decoded.id, role: decoded.role || user.role, user };
    next();
  } catch (err) {
    console.error("❌ verifyToken error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Tutor-only access check
export const verifyTutor = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded info to req.user
    req.user = decoded;

    if (decoded.role !== "tutor") {
      return res.status(403).json({ message: "Access denied: tutors only" });
    }

    next();
  } catch (err) {
    console.error("JWT Verification Failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};