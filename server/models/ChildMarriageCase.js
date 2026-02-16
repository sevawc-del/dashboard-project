// Child Marriage Case Model
const mongoose = require('mongoose');

const childMarriageCaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  victimAge: { type: Number },
  date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'investigating', 'resolved', 'closed'],
    default: 'pending'
  },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

childMarriageCaseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ChildMarriageCase', childMarriageCaseSchema);
