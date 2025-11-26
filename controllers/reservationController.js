const db = require('../models/index.js');
const Reservation = db.reservations;

// create reservation
exports.create = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { areaId, date } = req.body;

    if (!areaId || !date) {
      return res.status(400).json({ message: "areaId and date are required" });
    }

    const reservation = await Reservation.create({
      userId,
      areaId,
      date,
      status: "pending"
    });

    return res.status(201).json(reservation);
  } catch (err) {
    return res.status(500).json({ message: "Server error creating reservation", error: err.message });
  }
};

// approve reservation (pending -> approved)
exports.updateStatus = async (req, res) => {
  try {
    const { reservationId, status } = req.body;

    if (!reservationId || !status) {
      return res.status(400).json({ message: "reservationId and status are required" });
    }

    const updated = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Server error updating reservation", error: err.message });
  }
};

// get all reservations
exports.findAll = async (req, res) => {
  try {
    const list = await Reservation.find();
    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json({ message: "Server error getting reservations", error: err.message });
  }
};

// get reservation status info
exports.status = (req, res) => {
  res.status(200).json({
    allowed: ["pending", "approved", "rejected", "canceled"]
  });
};

// get reservations for a specific user
exports.findByUser = async (req, res) => {
  try {
    const list = await Reservation.find({ userId: req.params.userId });

    if (!list.length) {
      return res.status(404).json({ message: "No reservations for this user" });
    }

    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json({ message: "Server error retrieving reservations", error: err.message });
  }
};

// delete reservation
exports.deleteByUser = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.userId);

    if (!deleted) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json({ message: "Reservation canceled" });
  } catch (err) {
    return res.status(500).json({ message: "Server error deleting reservation", error: err.message });
  }
};
