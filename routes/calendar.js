const express = require('express');
const router = express.Router();
const controller = require('../controllers/calendarController');

//get full calendar (booked dates, available dates)
router.get('/', controller.findAll);

// create a calendar entry
router.post('/', controller.create);

// get calendar info by date
router.get('/:date', controller.findOne);

//delete an calendar entry by date
router.delete('/:date', controller.delete);

module.exports = router;
