const db = require('../models/index.js');
const Area = db.areas;

// GET all areas

exports.findAll = async (req, res) => {
  try {
    const areas = await Area.find();
    return res.status(200).json(areas);
  } catch (err) {
    return res.status(500).json({
      message: 'Server error getting areas',
      error: err.message
    });
  }
};

// CREATE new area

exports.create = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Area name is required' });
    }

    const newArea = await Area.create({
      name,
      description,
      price
    });

    return res.status(201).json(newArea);
  } catch (err) {
    return res.status(500).json({
      message: 'Server error creating area',
      error: err.message
    });
  }
};

// GET area by ID

exports.findOne = async (req, res) => {
  try {
    const area = await Area.findById(req.params.areaId);

    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    return res.status(200).json(area);
  } catch (err) {
    return res.status(500).json({
      message: 'Server error retrieving area',
      error: err.message
    });
  }
};

// UPDATE area by ID
exports.update = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const updatedArea = await Area.findByIdAndUpdate(
      req.params.areaId,
      { name, description, price },
      { new: true }
    );

    if (!updatedArea) {
      return res.status(404).json({ message: "Area not found" });
    }

    return res.status(200).json(updatedArea);
  } catch (err) {
    return res.status(500).json({
      message: 'Server error updating area',
      error: err.message
    });
  }
};

// delete area
exports.delete = async (req, res) => {
  try {
    const deleted = await Area.findByIdAndDelete(req.params.areaId);

    if (!deleted) {
      return res.status(404).json({ message: 'Area not found' });
    }

    return res.status(200).json({ message: 'Area removed' });
  } catch (err) {
    return res.status(500).json({
      message: 'Server error deleting area',
      error: err.message
    });
  }
};

