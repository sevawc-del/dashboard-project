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
//const authMiddleware = require('../middleware/authMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');


router.get('/', getAllCases);
router.get('/:id', getCaseById);
router.post('/',  createCase);
router.put('/:id',  updateCase);
router.delete('/:id',  deleteCase);

module.exports = router;
