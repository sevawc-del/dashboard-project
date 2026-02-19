// Child Marriage Case Routes
const express = require('express');
const router = express.Router();
const {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
} = require('../controllers/childMarriageCaseController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const handleUploadError = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      req.file = null;
    }
    next();
  });
};


router.get('/', getAllCases);
router.get('/:id', getCaseById);
router.post('/', protect, handleUploadError, createCase);
router.put('/:id', protect, handleUploadError, updateCase);
router.delete('/:id', protect, admin, deleteCase);

module.exports = router;
