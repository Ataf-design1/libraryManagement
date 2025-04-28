import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js"; // better to name import properlyjs

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process if DB fails
  }
};
connectDB();

// Routes
app.use("/api/books", bookRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Library Management API!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
