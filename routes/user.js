const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// create a new user
router.post('/', controller.create);

// login user (for now no authentication logic)
router.get('/login', controller.login);

// logout user
router.get('/logout', controller.logout);

// get user by username
router.get('/:username', controller.findOne);

// update user info
router.put('/:username', controller.update);

// delete user
router.delete('/:username', controller.delete);

module.exports = router;
