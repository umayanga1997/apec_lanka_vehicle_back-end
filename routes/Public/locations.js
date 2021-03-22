const express = require('express');
const router = express.Router();
const locations_controller = require('../../Controllers/locations_controller');
// const auth_controller = require('../../Controllers/auth_controller');
// const mobileVerify = require('../../Controllers/Tokens/userMobileVerifyToken');

router.get('/api/public/locations/',  locations_controller.getlocations);
router.get('/api/public/location/:location_id', locations_controller.getlocationByID);

module.exports = router;