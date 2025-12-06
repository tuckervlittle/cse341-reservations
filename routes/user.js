const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// create a new user
router.post('/', 
// #swagger.tags = ['Users']
// #swagger.description = 'Create a user'
    controller.create);

// login user (for now no authentication logic)
router.get('/login', 
    // #swagger.ignore = true
    controller.login);

//get all users
router.get('/',
// #swagger.tags = ['Users']
// #swagger.description = 'Get all users'
    controller.findAll);

// logout user
router.get('/logout', 
    // #swagger.ignore = true
    controller.logout);

// get user by username
router.get('/:username', 
// #swagger.tags = ['Users']
// #swagger.description = 'Get a user by username'
    controller.findOne);

// update user info
router.put('/:username', 
// #swagger.tags = ['Users']
// #swagger.description = 'Update a user by username'
/* #swagger.parameters['body'] = {
        in: 'body',
        description: 'User info to update',
        required: true,
        schema: {
            dni: "12345678",
            role: "resident",
            email: "user@example.com"
        }
    } */
    controller.update);

// delete user
router.delete('/:username', 
// #swagger.tags = ['Users']
// #swagger.description = 'Delete a user by username'
    controller.delete);

module.exports = router;

