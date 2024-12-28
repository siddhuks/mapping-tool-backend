// src/routes/messagesRoutes.js
const express = require('express');
const { fetchMessages, addEmail } = require('../controllers/messagesController');

const router = express.Router();

router.get('/messages/:messageType', fetchMessages);
router.post('/alerts/add-email', addEmail)

module.exports = router;