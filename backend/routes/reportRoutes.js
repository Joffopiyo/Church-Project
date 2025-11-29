const express = require('express');
const router = express.Router();
const { createReport, getDepartmentReports, getAllReports } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('DEPT_LEADER', 'ADMIN'), createReport)
    .get(protect, authorize('BISHOP', 'REVEREND', 'ADMIN'), getAllReports);

router.get('/department/:deptId', protect, getDepartmentReports);

module.exports = router;
