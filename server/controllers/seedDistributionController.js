// Seed Distribution Controller
const SeedDistribution = require('../models/SeedDistribution');

const getAllSeedDistributions = async (req, res) => {
  try {
    const seedDistributions = await SeedDistribution.find().sort({ createdAt: -1 });
    res.json(seedDistributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSeedDistributionById = async (req, res) => {
  try {
    const seedDistribution = await SeedDistribution.findById(req.params.id);
    if (!seedDistribution) {
      return res.status(404).json({ message: 'Seed distribution record not found' });
    }
    res.json(seedDistribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSeedDistribution = async (req, res) => {
  const seedDistribution = new SeedDistribution(req.body);
  try {
    const newSeedDistribution = await seedDistribution.save();
    res.status(201).json(newSeedDistribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSeedDistribution = async (req, res) => {
  try {
    const updatedSeedDistribution = await SeedDistribution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSeedDistribution) {
      return res.status(404).json({ message: 'Seed distribution record not found' });
    }
    res.json(updatedSeedDistribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSeedDistribution = async (req, res) => {
  try {
    const deletedSeedDistribution = await SeedDistribution.findByIdAndDelete(req.params.id);
    if (!deletedSeedDistribution) {
      return res.status(404).json({ message: 'Seed distribution record not found' });
    }
    res.json({ message: 'Seed distribution record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSeedDistributions,
  getSeedDistributionById,
  createSeedDistribution,
  updateSeedDistribution,
  deleteSeedDistribution,
};
