const db = require('../models/index.js');
const User = db.users;

// create a new user
exports.create = async (req, res) => {
  try {
    const { username, fullName, role, dni, email } = req.body;
    // Required fields
    if (!username || !fullName || !dni || !email) {
      return res.status(400).json({
        message: "username, fullName, dni and email are required"
      });
    }

    // dni must be numbers only
    if (!/^[0-9]+$/.test(dni)) {
      return res.status(400).json({
        message: "dni must contain only numbers"
      });
    }

    // valid roles
    const allowedRoles = ["resident", "admin"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`
      });
    }

    const newUser = await User.create({
      username,
      fullName,
      dni,
      role: role || "resident",
      email
    });

    return res.status(201).json(newUser);

  } catch (err) {

    // Detect duplicate values (username OR dni)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // "username" o "dni"
      return res.status(400).json({
        message: `The ${field} already exists. Please choose another one.`,
        field: field,
        value: err.keyValue[field]
      });
    }

    return res.status(500).json({
      message: "Server error creating user",
      error: err.message
    });
  }
};

// login (no real auth yet)
/*
#swagger.ignore = true
*/
exports.login = (req, res) => {
  res.status(200).json({ message: "Login placeholder (no real logic yet)" });
};

// logout (placeholder)
/*
#swagger.ignore = true
*/
exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout placeholder" });
};

// get user by username
exports.findOne = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (err) {
    return res.status(500).json({
      message: "Server error finding user",
      error: err.message
    });
  }
};

// update user info
exports.update = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updated);

  } catch (err) {

    // Duplicate check also applies when updating
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];

      return res.status(400).json({
        message: `Cannot update. The ${field} already exists.`,
        field: field,
        value: err.keyValue[field]
      });
    }

    return res.status(500).json({
      message: "Server error updating user",
      error: err.message
    });
  }
};

// delete user
exports.delete = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ username: req.params.username });

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User removed" });

  } catch (err) {
    return res.status(500).json({
      message: "Server error deleting user",
      error: err.message
    });
  }
};

