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

// update calendar entry by date
router.put('/:date', 
// #swagger.tags = ['Calendar']
  // #swagger.description = 'Update a date in the calendar'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Fields to update in the calendar entry',
        required: true,
        schema: {
          isAvailable: true,
          notes: "Updated notes for this date",
          areaId: "69344b2bf3153d8d8c6079f6"
        }
  } */
    controller.update);

//delete an calendar entry by date
router.delete('/:date', 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Delete a date in the calendar'
    controller.delete);

module.exports = router;

