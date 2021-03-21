const express = require('express');
const router = express.Router();
const vImageGalleryController = require('../../Controllers/vehicles_image_gallery_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.post('/api/private/images/gallery/:v_id',userVerify, vImageGalleryController.postVImageGallery);
router.put('/api/private/images/gallery/:image_g_id/:v_id/',userVerify, vImageGalleryController.putVImageGalleryByImageIDWithVID);
router.delete('/api/private/images/gallery/:image_g_id/:v_id/',userVerify, vImageGalleryController.deleteVImageGalleryByImageIDWithVID);
router.delete('/api/private/images/gallery/:v_id/',userVerify, vImageGalleryController.deleteVImageGalleryByVID);

 module.exports = router;
