// src/app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authRoutes");
const authenticateToken = require('./src/middlewares/authMiddleware');
const messagesRoutes = require("./src/routes/messagesRoutes");
const mirthRoutes = require('./src/routes/mirthRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


// app.get('/health', (req, res) => {
//     res.status(200).send('OK');
// });


// Middleware specifically for /mirth/receive
app.use('/api/mirth/receive', bodyParser.text({ type: 'text/plain' }));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api", messagesRoutes);
app.use('/api', mirthRoutes);

app.use((req, res, next) => {
    console.log("routing...", req.path)

    if (req.path === '/api/mirth/receive' || req.path === '/api/mirth/messages') {
        console.log("path is ", req.path)
        return next(); // Skip `authenticateToken` for this route
    }
});


module.exports = app;