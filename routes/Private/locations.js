const express = require('express');
const router = express.Router();
const locations_controller = require('../../Controllers/locations_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/private/location/',  locations_controller.postlocation);
router.put('/api/private/location/:location_id',userVerify,  locations_controller.putlocation);
// router.delete('/api/private/location/:location_id',userVerify,  locations_controller.deletelocation);
router.delete('/api/private/location/:location_id', locations_controller.deletelocation);

module.exports = router;