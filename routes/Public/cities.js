const express = require('express');
const router = express.Router();
const cities_controller = require('../../Controllers/cities_controller');
const auth_controller = require('../../Controllers/auth_controller');
// const mobileVerify = require('../../Controllers/Tokens/userMobileVerifyToken');

router.get('/api/public/cities/',  cities_controller.getCities);
router.get('/api/public/city/:city_id', cities_controller.getCityByID);

module.exports = router;