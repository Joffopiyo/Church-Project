const express = require('express');
const router = express.Router();
const { recordAttendance, getAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, recordAttendance)
    .get(protect, getAttendance);

module.exports = router;
