// src/server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET); // { id, role, iat, exp }

    //y fetch user summary
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: decoded.id, role: decoded.role || user.role, user };
    next();
  } catch (err) {
    console.error("verifyToken error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const verifyTutor = (req, res, next) => {
 
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "tutor")
    return res.status(403).json({ message: "Access denied: tutors only" });
  next();
};
