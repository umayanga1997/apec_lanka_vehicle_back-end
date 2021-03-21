const express = require('express');
const router = express.Router();
const vImageGalleryController = require('../../Controllers/vehicles_image_gallery_controller');

router.get('/api/public/images/gallery/:v_id',vImageGalleryController.getVImageGalleryByVID);

module.exports = router;
