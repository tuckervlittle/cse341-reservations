const express = require('express');
const router = express.Router();
const controller = require('../controllers/areaController');

// get all areas (club house, grill zone, sport court)
router.get('/',
// #swagger.tags = ['Areas']
// #swagger.description = 'Get all areas'
    controller.findAll);

// create new area
router.post('/', 
// #swagger.tags = ['Areas']
// #swagger.description = 'Create an area'
    controller.create);

// get area by ID
router.get('/:areaId', 
// #swagger.tags = ['Areas']
// #swagger.description = 'Get an area by ID'
    controller.findOne);

// update area
router.put('/:areaId', 
// #swagger.tags = ['Areas']
// #swagger.description = 'Update an area by ID'
/* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Fields to update',
        required: true,
        schema: {
          name: "Club House Updated",
          description: "Main club house",
          price: 120
        }
  } */
    controller.update);

// delete area
router.delete('/:areaId', 
// #swagger.tags = ['Areas']
// #swagger.description = 'Delete an area by ID'
    controller.delete);

module.exports = router;

