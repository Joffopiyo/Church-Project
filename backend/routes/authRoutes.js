const express = require('express');
const router = express.Router();
const { registerUser, authUser, forgotPassword, resetPassword, revokeToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/revoke', protect, revokeToken);

module.exports = router;
