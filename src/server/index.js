// src/server/index.js

import dotenv from "dotenv";
dotenv.config();
// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import Message from "./models/Message.js"; // ✅ Make sure this model exists
import paymentRoutes from "./routes/paymentRoutes.js";


// Initialize Express app
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,
  })
);

// ✅ Connect to Database
connectDB();
app.use("/api/auth", authRoutes); 
// ✅ Middleware
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(helmet());


// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutor/pricing", pricingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tutor", tutorRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Setup Socket.IO with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// ✅ Socket.IO Events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  socket.on("sendMessage", async (msg) => {
    try {
      const message = await Message.create(msg);
      io.to(msg.chatId).emit("receiveMessage", message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected");
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
