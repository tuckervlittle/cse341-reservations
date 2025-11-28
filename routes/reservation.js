const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

// create reservation 
router.post('/:userId', controller.create);

// approve reservation (pending -> approved)
router.put('/:reservationId', controller.updateStatus);

// get all reservations
router.get('/', controller.findAll);

// get reservation status info
router.get('/status', controller.status);

// get reservations for a specific user
router.get('/:userId', controller.findByUser);

// delete reservation (admin can delete any, users delete their own)
router.delete('/:reservationId', controller.deleteByReservation);

module.exports = router;
