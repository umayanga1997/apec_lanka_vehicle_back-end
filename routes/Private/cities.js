const express = require('express');
const router = express.Router();
const cities_controller = require('../../Controllers/cities_controller');
const auth_controller = require('../../Controllers/auth_controller');

router.post('/api/private/city/',auth_controller,  cities_controller.postCity);
router.put('/api/private/city/:city_id',auth_controller,  cities_controller.putCity);
router.delete('/api/private/city/:city_id',auth_controller,  cities_controller.deleteCity);

module.exports = router;