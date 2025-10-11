import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Initialize Express app
const app = express();
connectDB();
app.use(cors());                     // allow cross-origin requests
app.use(express.json());             // parse JSON body
app.use("/api/auth", authRoutes); 
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend port
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
