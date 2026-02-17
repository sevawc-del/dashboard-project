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
router.post('/', createSeedDistribution);
router.put('/:id', updateSeedDistribution);
router.delete('/:id', deleteSeedDistribution);

module.exports = router;
