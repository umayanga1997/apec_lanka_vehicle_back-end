const express = require('express');
const router = express.Router();
const vImageGalleryController = require('../../Controllers/vehicles_image_gallery_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/public/images/Gallery/',userVerify, vImageGalleryController.postVImageGallery);
router.put('/api/public/images/Gallery/:image_g_id/:v_id/',userVerify, vImageGalleryController.putVImageGalleryByImageIDWithVID);
router.delete('/api/public/images/Gallery/:image_g_id/:v_id/',userVerify, vImageGalleryController.deleteVImageGalleryByImageIDWithVID);
router.delete('/api/public/images/Gallery/:v_id/',userVerify, vImageGalleryController.deleteVImageGalleryByVID);

 module.exports = router;
