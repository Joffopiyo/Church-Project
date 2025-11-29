const express = require('express');
const router = express.Router();
const {
    createSickRecord,
    getSickRecords,
    getSickRecordById,
    updateSickRecord
} = require('../controllers/sickRecordController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createSickRecord)
    .get(protect, getSickRecords);

router.route('/:id')
    .get(protect, getSickRecordById)
    .put(protect, updateSickRecord);

module.exports = router;
