const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

// create reservation 
router.post('/user/:username',
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Create a reservation for a specific user'
    controller.create
);

// get reservations for a specific user
router.get('/user/:username',
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Get reservations of a specific user'
    controller.findByUser
);

// approve reservation (pending -> approved)
router.put('/:_id',
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Update reservation status'
    controller.updateStatus
);

// delete reservation
router.delete('/:_id',
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Delete a reservation by ID'
    controller.deleteByReservation
);

// get reservation status info
router.get('/status',
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Get reservation status info'
    controller.status
);

// get all reservations
router.get('/',
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Get all reservations'
    controller.findAll
);

module.exports = router;

