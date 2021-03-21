const express = require('express');
const router = express.Router();
const cities_controller = require('../../Controllers/cities_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/private/city/',userVerify,  cities_controller.postCity);
router.put('/api/private/city/:city_id',userVerify,  cities_controller.putCity);
// router.delete('/api/private/city/:city_id',userVerify,  cities_controller.deleteCity);
router.delete('/api/private/city/:city_id', cities_controller.deleteCity);

module.exports = router;