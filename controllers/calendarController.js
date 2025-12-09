const db = require('../models/index.js');
const Calendar = db.calendar;

// get full calendar

exports.findAll = async (req, res) => {
  try {
    const entries = await Calendar.find();
    return res.status(200).json(entries);
  } catch (err) {
    return res.status(500).json({ message: "Server error getting calendar", error: err.message });
  }
};

// create a calendar entry

exports.create = async (req, res) => {
  try {
    const { date, areaId, isAvailable, notes } = req.body;

    if (!date || !areaId) {
      return res.status(400).json({ message: "date and areaId are required" });
    }

    if (is_available === true) {
      const existingReservation = await db.reservations.findOne({
        areaId: areaId,
        date: date
      });
      if (existingReservation) {
        return res.status(400).json({
          message: "Area already reserved on this date. Calendar cannot mark it as available."
        });
      }
    }

    const newEntry = await Calendar.create({
      date,
      areaId,
      isAvailable,
      notes
    });

    return res.status(201).json(newEntry);
  } catch (err) {
    return res.status(500).json({ message: "Server error creating calendar entry", error: err.message });
  }
};

// get calendar info by date

exports.findOne = async (req, res) => {
  try {
    const entry = await Calendar.findOne({ date: req.params.date });

    if (!entry) {
      return res.status(404).json({ message: "No calendar entry for this date" });
    }

    return res.status(200).json(entry);
  } catch (err) {
    return res.status(500).json({ message: "Server error getting calendar entry", error: err.message });
  }
};

// update calendar entry by ID
exports.update = async (req, res) => {
  try {
    const { isAvailable, notes, areaId } = req.body;

    const updatedEntry = await Calendar.findByIdAndUpdate(
      req.params.id,
      { isAvailable, notes, areaId },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Calendar entry not found" });
    }

    return res.status(200).json(updatedEntry);
  } catch (err) {
    return res.status(500).json({ message: "Server error updating calendar", error: err.message });
  }
};

// delete calendar entry by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Calendar.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Calendar entry not found" });
    }

    return res.status(200).json({ message: "Calendar entry deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error deleting calendar", error: err.message });
  }
};

