const express = require('express');
const router = express.Router();
const vehicles_controller = require('../../Controllers/vehicles_controller');
// const auth_controller = require('../../Controllers/auth_controller');
// const mobileVerify = require('../../Controllers/Tokens/userMobileVerifyToken');

router.get('/api/public/vehicles/',  vehicles_controller.getVehicles);
router.get('/api/public/vehicles/:v_id', vehicles_controller.getVehicleByID);
router.get('/api/public/vehicles/:v_type_id/:v_city_id', vehicles_controller.getVehicleByTypeWithCity);

module.exports = router;