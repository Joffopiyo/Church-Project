const express = require('express');
const router = express.Router();
const {
    createDuty,
    getMyDuties,
    getAssignedDuties,
    updateDutyStatus
} = require('../controllers/dutyController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('BISHOP', 'REVEREND', 'OVERSEER', 'SENIOR_PASTOR', 'DEPT_LEADER', 'ADMIN'), createDuty);

router.get('/my', protect, getMyDuties);
router.get('/assigned', protect, getAssignedDuties);

router.put('/:id/status', protect, updateDutyStatus);

module.exports = router;
