const express = require('express');
const router = express.Router();
const vImageGalleryController = require('../../Controllers/vehicles_image_gallery_controller');

router.get('/api/public/images/Gallery/:v_id',vImageGalleryController.getVImageGallery);

module.exports = router;
