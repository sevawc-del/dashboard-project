// Child Marriage Case Controller
const ChildMarriageCase = require('../models/ChildMarriageCase');
const cloudinary = require('../config/cloudinary');

const getAllCases = async (req, res) => {
  try {
    const cases = await ChildMarriageCase.find().sort({ date: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCaseById = async (req, res) => {
  try {
    const childMarriageCase = await ChildMarriageCase.findById(req.params.id);
    if (!childMarriageCase) return res.status(404).json({ message: 'Case not found' });
    res.json(childMarriageCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCase = async (req, res) => {
  try {
    let imageUrl = req.body.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'childmarriage',
        resource_type: 'image'
      });
      imageUrl = result.secure_url;
    }

    const childMarriageCase = new ChildMarriageCase({
      ...req.body,
      image: imageUrl || ''
    });

    const newCase = await childMarriageCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCase = async (req, res) => {
  try {
    let imageUrl = req.body.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'manav-seva/childmarriage',
        resource_type: 'image'
      });
      imageUrl = result.secure_url;
    }

    const updateData = {
      ...req.body,
      updatedAt: Date.now()
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updatedCase = await ChildMarriageCase.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedCase) return res.status(404).json({ message: 'Case not found' });
    res.json(updatedCase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCase = async (req, res) => {
  try {
    const deletedCase = await ChildMarriageCase.findByIdAndDelete(req.params.id);
    if (!deletedCase) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Case deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
};
