const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware')
const { createChannel, deployChannel, sendJSON, receiveHL7Message, fetchHL7Messages } = require('../controllers/mirthController');

const router = express.Router();

router.post('/mirth/create-channel', authenticateToken, createChannel);
router.post('/mirth/deploy-channel', authenticateToken, deployChannel);
router.post('/mirth/send-json', authenticateToken, sendJSON);
router.post('/mirth/receive', receiveHL7Message)
router.get('/mirth/messages', fetchHL7Messages)

module.exports = router;