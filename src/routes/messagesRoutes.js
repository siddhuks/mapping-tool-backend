// src/routes/messagesRoutes.js
const express = require('express');
const { fetchMessages } = require('../controllers/messagesController');

const router = express.Router();

router.get('/messages/:messageType', fetchMessages);

module.exports = router;