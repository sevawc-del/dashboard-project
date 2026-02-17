// Seed Distribution Model
const mongoose = require('mongoose');

const seedDistributionSchema = new mongoose.Schema({
  // Location Details
  panchayat: { type: String, required: true },
  revenueVillage: { type: String, required: true },
  
  // CRP & Location Info
  crpName: { type: String, required: true },
  tolaNameWardNo: { type: String, required: true },
  
  // Farmer Details
  farmerName: { type: String, required: true },
  fatherHusbandName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  
  // Seed & Fertilizer Details
  maizeSeedPacket: { type: String, default: 0 },
  zincSulphate: { type: Number, default: 0 },
  atrazine: { type: Number, default: 0 },
  oorja: { type: Number, default: 0 },
  gypsum: { type: Number, default: 0 },
  
  // Date & Other Details
  sowingDate: { type: Date },
  expectedHarvestingDate: { type: Date },
  intercrop: { type: String, enum: ['yes', 'no', ''], default: '' },
  silage: { type: String, enum: ['yes', 'no', ''], default: '' },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

seedDistributionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('SeedDistribution', seedDistributionSchema);
