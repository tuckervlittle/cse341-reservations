const express = require('express');
const router = express.Router();
const controller = require('../controllers/calendarController');
const { isAuthenticated, isAdmin } = require('../middleware/authenticate');

//
//// CALENDAR — PUBLIC (Resident + Admin)

//get full calendar (booked dates, available dates)
router.get('/',
    isAuthenticated,
// #swagger.tags = ['Calendar']
// #swagger.description = 'Get all dates in the calendar'
    controller.findAll);

// get calendar info by date
router.get('/:date',
    isAuthenticated, 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Get information of a specific date in the calendar'
    controller.findOne);

//
// //CALENDAR — ADMIN ONLY

// create a calendar entry
router.post('/',
    isAuthenticated,
    isAdmin, 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Create a date in a calendar'
    /* #swagger.parameters['Calendar'] = {
      in: 'body',
      description: 'Calendar to create',
      required: true,
      schema: { $ref: '#/definitions/Calendar' }
  } */
    controller.create);

// update calendar entry by ID
router.put('/:id',
    isAuthenticated,
    isAdmin, 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Update a calendar entry by ID'
    /* #swagger.parameters['UpdatedCalendar'] = {
      in: 'body',
      description: 'Calendar to update',
      required: true,
      schema: { $ref: '#/definitions/UpdatedCalendar' }
  } */
    controller.update);

// delete a calendar entry by ID
router.delete('/:id',
    isAuthenticated,
    isAdmin, 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Delete a calendar entry by ID'
    controller.delete);

module.exports = router;

