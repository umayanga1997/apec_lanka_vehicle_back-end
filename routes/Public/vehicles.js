const express = require('express');
const router = express.Router();
const vehicles_controller = require('../../Controllers/vehicles_controller');
// const auth_controller = require('../../Controllers/auth_controller');
// const mobileVerify = require('../../Controllers/Tokens/userMobileVerifyToken');

router.get('/api/public/vehicles/',  vehicles_controller.getVehicles);
router.get('/api/public/vehicle/:v_id/', vehicles_controller.getVehicleByID);
router.get('/api/public/vehicles/:v_owner_id/', vehicles_controller.getVehiclesByOwnerID);
router.get('/api/public/vehicles/:v_type_id/:v_location_id/', vehicles_controller.getVehiclesByTypeWithlocation);

module.exports = router;