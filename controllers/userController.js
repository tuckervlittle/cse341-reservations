const db = require('../models/index.js');
const User = db.users;

// create a new user
exports.create = async (req, res) => {
  try {
    const { username, fullName, userType } = req.body;

    if (!username || !fullName) {
      return res.status(400).json({ message: "username and fullName are required" });
    }

    const newUser = await User.create({
      username,
      fullName,
      userType: userType || "resident"
    });

    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ message: "Server error creating user", error: err.message });
  }
};

// login (no real auth yet)
exports.login = (req, res) => {
  res.status(200).json({ message: "Login placeholder (no real logic yet)" });
};

// logout (placeholder)
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
    return res.status(500).json({ message: "Server error finding user", error: err.message });
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
    return res.status(500).json({ message: "Server error updating user", error: err.message });
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
    return res.status(500).json({ message: "Server error deleting user", error: err.message });
  }
};
