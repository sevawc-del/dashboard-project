// Seed Distribution Routes
const express = require('express');
const router = express.Router();
const {
  getAllSeedDistributions,
  getSeedDistributionById,
  createSeedDistribution,
  updateSeedDistribution,
  deleteSeedDistribution,
} = require('../controllers/seedDistributionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllSeedDistributions);
router.get('/:id', getSeedDistributionById);
router.post('/', protect, createSeedDistribution);
router.put('/:id', protect, updateSeedDistribution);
router.delete('/:id', protect, admin, deleteSeedDistribution);

module.exports = router;
