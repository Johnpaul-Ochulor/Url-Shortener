import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import connectDB from "./routes/url.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
// app.use(cors());

// API Routes
app.use('/api', urlRoutes);

// Redirect Route (The dynamic :shortCode)
app.use('/', urlRoutes);



//Test route
// app.get("/", (req, res) => {
// res.send("URL Shortner API running")
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


