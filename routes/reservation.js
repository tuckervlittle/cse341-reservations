const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');
const { isAuthenticated, isAdmin } = require('../middleware/authenticate');

//
//RESERVATIONS: RESIDENT + ADMIN

// create reservation 
router.post('/user/:username',
    isAuthenticated,
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Create a reservation for a specific user'
    /* #swagger.parameters['Reservation'] = {
      in: 'body',
      description: 'Reservation to create',
      required: true,
      schema: { $ref: '#/definitions/Reservation' }
  } */
    controller.create
);

// get reservations for a specific user
router.get('/user/:username',
    isAuthenticated,
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Get reservations of a specific user'
    controller.findByUser
);

// delete reservation
router.delete('/:_id',
     isAuthenticated,
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Delete a reservation by ID'
    controller.deleteByReservation
);

// get reservation status info (public)
router.get('/status',
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Get reservation status info'
    controller.status
);

//
//// RESERVATIONS — ADMIN ONLY

// approve reservation (pending -> approved)
router.put('/:_id',
    isAuthenticated,
    isAdmin,
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Update reservation status'
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Status update for the reservation',
        required: true,
        schema: {
            status: "approved",
            admin_comment: "Approved by admin"
        }
    } */
    controller.updateStatus
);

// get all reservations
router.get('/',
    isAuthenticated,
    isAdmin,
    // #swagger.tags = ['Reservations']
    // #swagger.description = 'Get all reservations'
    controller.findAll
);

module.exports = router;

