// src/routes/messagesRoutes.js
const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware')
const { fetchMessages, addEmail } = require('../controllers/messagesController');

const router = express.Router();

router.get('/messages/:messageType', authenticateToken, fetchMessages);
router.post('/alerts/add-email', authenticateToken, addEmail)

module.exports = router;