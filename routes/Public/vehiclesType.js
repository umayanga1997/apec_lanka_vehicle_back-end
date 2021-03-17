const express = require('express');
const router= express.Router();
const vehicles_types_controller = require('../../Controllers/vehicles_types_controller');
const auth_controller = require('../../Controllers/auth_controller');

router.get('/api/public/vehicle_type/',  vehicles_types_controller.getVTypes);
router.get('/api/public/vehicle_type/:vehicle_type_id', vehicles_types_controller.getVTypeByID);

module.exports = router;
