const express = require('express');
const router = express.Router();
const controller = require('../controllers/calendarController');

//get full calendar (booked dates, available dates)
router.get('/',
// #swagger.tags = ['Calendar']
// #swagger.description = 'Get all dates in the calendar'
    controller.findAll);

// create a calendar entry
router.post('/', 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Create a date in a calendar'
    controller.create);

// get calendar info by date
router.get('/:date', 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Get information of a specific date in the calendar'
    controller.findOne);

//delete an calendar entry by date
router.delete('/:date', 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Delete a date in the calendar'
    controller.delete);

module.exports = router;

