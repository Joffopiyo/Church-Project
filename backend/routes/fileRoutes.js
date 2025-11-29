const express = require('express');
const router = express.Router();
const { getSignedUrl, getFileById } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getFileById);
router.get('/:id/signed-url', protect, getSignedUrl);

module.exports = router;
