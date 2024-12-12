// src/app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require('./middlewares/authMiddleware');
const messagesRoutes = require("./routes/messagesRoutes");
const mirthRoutes = require('./routes/mirthRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", authenticateToken, messagesRoutes);
app.use('/api', mirthRoutes);

module.exports = app;