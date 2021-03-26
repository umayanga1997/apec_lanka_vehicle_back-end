const express = require('express');
const router = express.Router();
const config_controller = require('../../Controllers/transaction_config_controller');

router.get('/api/public/transaction/config/',  config_controller.getConfig);

module.exports = router;