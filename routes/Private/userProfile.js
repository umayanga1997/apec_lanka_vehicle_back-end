const express = require('express');
const router = express.Router();
const profile_controller = require('../../Controllers/user_profile_controller');
const userVerify = require('../../Controllers/Tokens/userAuthVerifyToken');

router.get('/api/user/profile/', userVerify, profile_controller.getUserProfileDetails);
router.get('/api/user/profiles/',userVerify, profile_controller.getUsersProfileDetails);
router.put('/api/user/profile/', userVerify, profile_controller.putUserProfileDetails);
// router.put('/api/user/profile/status/', userVerify, profile_controller.putUserProfileStatus);
router.delete('/api/user/profile/', userVerify, profile_controller.deleteUserProfile);
router.get('/api/user/auth/verify/acc/',userVerify,  profile_controller.getUserAccStatus);

module.exports = router;