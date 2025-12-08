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
/* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Calendar entry data',
      required: true,
      schema: {
          date: "2025-12-10T10:00:00.000Z",
          areaId: "69370726be054fd5397f873d",
          isAvailable: true,
          notes: "Reserved for community meeting"
      }
} */
    controller.create);

// update calendar entry by date
router.put('/:date',
    isAuthenticated,
    isAdmin, 
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
    isAuthenticated,
    isAdmin, 
// #swagger.tags = ['Calendar']
// #swagger.description = 'Delete a date in the calendar'
    controller.delete);

module.exports = router;

