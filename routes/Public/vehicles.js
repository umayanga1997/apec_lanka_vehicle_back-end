const express = require('express');
const router = express.Router();
const vehicles_controller = require('../../Controllers/vehicles_controller');
// const auth_controller = require('../../Controllers/auth_controller');
// const mobileVerify = require('../../Controllers/Tokens/userMobileVerifyToken');

router.get('/api/public/vehicles/',  vehicles_controller.getVehicles);
router.get('/api/public/vehicle/:v_id', vehicles_controller.getVehicleByID);
router.get('/api/public/vehicles/qr/:user_qr', vehicles_controller.getVehiclesByOwnerQRID);
router.get('/api/public/vehicles/:o_v_id', vehicles_controller.getVehiclesByOwnerSomeVehicleID);
router.get('/api/public/vehicles/:v_type_id/:v_location_id', vehicles_controller.getVehiclesByTypeWithlocation);

module.exports = router;