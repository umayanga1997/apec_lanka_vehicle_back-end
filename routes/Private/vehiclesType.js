const express = require('express');
const router= express.Router();
const vehicles_types_controller = require('../../Controllers/vehicles_types_controller');
const auth_controller = require('../../Controllers/auth_controller');

router.post('/api/private/vehicle_type/',auth_controller,  vehicles_types_controller.postVType);
router.put('/api/private/vehicle_type/:vehicle_type_id',auth_controller,  vehicles_types_controller.putVType);
router.delete('/api/private/vehicle_type/:vehicle_type_id',auth_controller,  vehicles_types_controller.deleteVType);

module.exports = router;
