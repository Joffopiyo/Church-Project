const express = require('express');
const router = express.Router();
const {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getDepartments)
    .post(protect, authorize('BISHOP', 'REVEREND', 'ADMIN'), createDepartment);

router.route('/:id')
    .put(protect, authorize('ADMIN'), updateDepartment)
    .delete(protect, authorize('ADMIN'), deleteDepartment);

module.exports = router;
