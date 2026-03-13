import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/url.js"; 

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
// app.use(cors()); // Uncomment this later if you build a Frontend (React/Vue)

// API Routes
app.use('/api', urlRoutes);

// Redirect Route (The dynamic :shortCode)
app.use('/', urlRoutes);

// Test route 
app.get("/health", (req, res) => {
  res.send("URL Shortener API is healthy and running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  const mode = process.env.NODE_ENV || 'development';
  console.log(`🚀 Server running in ${mode} mode on port ${PORT}`);
});