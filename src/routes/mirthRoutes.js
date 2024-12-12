const express = require('express');
const { createChannel, deployChannel } = require('../controllers/mirthController');

const router = express.Router();

router.post('/mirth/create-channel', createChannel);
router.post('/mirth/deploy-channel', deployChannel);

module.exports = router;