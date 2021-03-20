const express = require('express');
const router = express.Router();
const vehicles_controller = require('../../Controllers/vehicles_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/private/vehicle/',userVerify,  vehicles_controller.postVehicle);
router.put('/api/private/vehicle/details/:v_id',userVerify,  vehicles_controller.putVehicleDetails);
router.put('/api/private/vehicle/status/:v_id',userVerify,  vehicles_controller.putVehicleStatus);
router.delete('/api/private/vehicle/:v_id',userVerify,  vehicles_controller.deleteVehicle);

module.exports = router;