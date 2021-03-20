const express = require('express');
const router= express.Router();
const vehicles_types_controller = require('../../Controllers/vehicles_types_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/private/vehicle_type/',userVerify,  vehicles_types_controller.postVType);
router.put('/api/private/vehicle_type/:vehicle_type_id',userVerify,  vehicles_types_controller.putVType);
router.delete('/api/private/vehicle_type/:vehicle_type_id',userVerify,  vehicles_types_controller.deleteVType);

module.exports = router;
