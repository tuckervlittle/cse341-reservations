const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

// create reservation 
router.post('/:userId', 
// #swagger.tags = ['Reservations']
// #swagger.description = 'Create a reservation for a specific user'
    controller.create);

// approve reservation (pending -> approved)
router.put('/:reservationId', 
// #swagger.tags = ['Reservations']
// #swagger.description = 'Update reservation status'
    controller.updateStatus);

// get all reservations
router.get('/', 
// #swagger.tags = ['Reservations']
// #swagger.description = 'Get all reservations'
    controller.findAll);

// get reservation status info
router.get('/status', 
// #swagger.tags = ['Reservations']
// #swagger.description = 'Get reservation status info'
    controller.status);

// get reservations for a specific user
router.get('/:userId', 
// #swagger.tags = ['Reservations']
// #swagger.description = 'Get reservations of a specific user'
    controller.findByUser);

// delete reservation (admin can delete any, users delete their own)
router.delete('/:reservationId', 
// #swagger.tags = ['Reservations']
// #swagger.description = 'Delete a reservation by ID'
    controller.deleteByReservation);

module.exports = router;
