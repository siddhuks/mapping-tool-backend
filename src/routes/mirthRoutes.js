const express = require('express');
const { createChannel, deployChannel, sendJSON } = require('../controllers/mirthController');

const router = express.Router();

router.post('/mirth/create-channel', createChannel);
router.post('/mirth/deploy-channel', deployChannel);
router.post('/mirth/send-json', sendJSON);

module.exports = router;