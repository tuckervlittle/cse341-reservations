//const Calendar = require('../models/calendar');
const db = require('../models');
const Calendar = db.calendar;

// findAll will work once the database is connected:

// get full calendar
// exports.findAll = async (req, res) => {
//   try {
//     const entries = await Calendar.find();
//     return res.status(200).json(entries);
//   } catch (err) {
//     return res.status(500).json({ message: "Server error getting calendar", error: err.message });
//   }
// };

// I put this just to test, since we are not connected to any database for now:
exports.findAll = async (req, res) => {
  return res.status(200).json([
    { date: "2025-01-01", areaId: "1", is_available: true, notes: "" }
  ]);
};


// create a calendar entry
exports.create = async (req, res) => {
  try {
    const { date, areaId, isAvailable } = req.body;

    if (!date || !areaId) {
      return res.status(400).json({ message: "date and areaId are required" });
    }

    const newEntry = await Calendar.create({
      date,
      areaId,
      isAvailable: isAvailable ?? true
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

// delete entry by date
exports.delete = async (req, res) => {
  try {
    const deleted = await Calendar.findOneAndDelete({ date: req.params.date });

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found on this date" });
    }

    return res.status(200).json({ message: "Calendar entry deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error deleting calendar", error: err.message });
  }
};
