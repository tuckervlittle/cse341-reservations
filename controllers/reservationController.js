const db = require('../models/index.js');
const Reservation = db.reservations;

// create reservation
exports.create = async (req, res) => {
  try {
    const username = req.params.username;
    const { areaName, date } = req.body;

    if (!username || !areaName || !date) {
      return res.status(400).json({ message: "username, areaName and date are required" });
    }

    // Find user by username 
    const user = await db.users.findOne({ username: username });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Only registered users can create reservations."
      });
    }

    const area = await db.areas.findOne({ name: areaName });

    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }

    // Check if the calendar blocks this date for this area
    const calendarBlock = await db.calendar.findOne({
      areaId: area._id.toString(),
      date: date,
      isAvailable: false
    });

    if (calendarBlock) {
      return res.status(400).json({
        message: "This date is blocked in the calendar for this area"
      });
    }

    // Check if this area already has a reservation for this date
    const existingReservation = await Reservation.findOne({
      areaId: area._id,
      date: date
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "This area is already reserved for this date"
      });
    }

    // Create reservation using user._id
    const reservation = await Reservation.create({
      userId: user._id,
      areaId: area._id,
      date,
      status: "pending",
    });

    const responseObject = {
      ...reservation.toObject(),
      areaName: area.name
    };

    return res.status(201).json(responseObject);

  } catch (err) {
    return res.status(500).json({ message: "Server error creating reservation", error: err.message });
  }
};

// approve reservation (pending -> approved)
exports.updateStatus = async (req, res) => {
  try {
    const reservationId = req.params._id;
    const { status, admin_comment } = req.body;

    if (!reservationId || !status) {
      return res.status(400).json({ message: "reservationId and status are required" });
    }

    const updated = await Reservation.findByIdAndUpdate(
      reservationId,
      { status, admin_comment },
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

    if (!list.length) {
      return res.status(200).json([]);
    }

    const result = await Promise.all(
      list.map(async (reservation) => {
        const area = await db.areas.findById(reservation.areaId);

        return {
          ...reservation.toObject(),
          areaName: area ? area.name : null
        };
      })
    );

    return res.status(200).json(result);

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
    const username = req.params.username;
    const user = await db.users.findOne({ username: username });
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const list = await db.reservations.find({ userId: user._id });

    if (!list.length) {
      return res.status(404).json({ message: "No reservations for this user" });
    }

    const result = await Promise.all(
      list.map(async (reservation) => {
        const area = await db.areas.findById(reservation.areaId);

        return {
          ...reservation.toObject(),
          areaName: area ? area.name : null
        };
      })
    );

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ message: "Server error retrieving reservations", error: err.message });
  }
};

// delete reservation
exports.deleteByReservation = async (req, res) => {
  try {
    const reservationId = req.params._id;
    const userId = req.user._id; 
    const userRole = req.user.role;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (userRole !== "admin" && reservation.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not allowed to cancel this reservation" });
    }

    await Reservation.findByIdAndDelete(reservationId);
    return res.status(200).json({ message: "Reservation canceled" });

  } catch (err) {
    return res.status(500).json({ message: "Server error deleting reservation", error: err.message });
  }
};

