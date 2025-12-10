const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/authenticate');

//
//// USERS – ADMIN ONLY

// create a new user
router.post('/',
    isAuthenticated,
    isAdmin,
// #swagger.tags = ['Users']
// #swagger.description = 'Create a user'
    /* #swagger.parameters['User'] = {
      in: 'body',
      description: 'User to create',
      required: true,
      schema: { $ref: '#/definitions/User' }
  } */
    controller.create);

//get all users
router.get('/',
    isAuthenticated,
    isAdmin,
// #swagger.tags = ['Users']
// #swagger.description = 'Get all users'
    controller.findAll);

// logout user
router.get('/logout', 
    // #swagger.ignore = true
    controller.logout);

// get user by username (ADMIN OR OWNER)
router.get('/:username',
    isAuthenticated,
    // custom access rule
    (req, res, next) => {
        if (req.session.user.role === 'admin') return next();
        if (req.session.user.username === req.params.username) return next();
        return res.status(403).json({ message: "Forbidden: You cannot view other users." });
    }, 
// #swagger.tags = ['Users']
// #swagger.description = 'Get a user by username'
    controller.findOne);

// update user info (ADMIN ONLY)
router.put('/:username',
    isAuthenticated,
    isAdmin,
// #swagger.tags = ['Users']
// #swagger.description = 'Update a user by username'
    /* #swagger.parameters['User'] = {
      in: 'body',
      description: 'User to update',
      required: true,
      schema: { $ref: '#/definitions/UpdatedUser' }
  } */
    controller.update);

// delete a user (ADMIN ONLY)
router.delete('/:username',
    isAuthenticated,
    isAdmin, 
// #swagger.tags = ['Users']
// #swagger.description = 'Delete a user by username'
    controller.delete);

module.exports = router;

