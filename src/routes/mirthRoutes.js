const express = require('express');
const { createChannel, deployChannel, sendJSON, receiveHL7Message, fetchHL7Messages } = require('../controllers/mirthController');

const router = express.Router();

router.post('/mirth/create-channel', createChannel);
router.post('/mirth/deploy-channel', deployChannel);
router.post('/mirth/send-json', sendJSON);
router.post('/mirth/receive', receiveHL7Message)
router.get('/mirth/messages', fetchHL7Messages)

module.exports = router;