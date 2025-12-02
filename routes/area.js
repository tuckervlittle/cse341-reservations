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

// delete area
router.delete('/:areaId', 
// #swagger.tags = ['Areas']
// #swagger.description = 'Delete an area by ID'
    controller.delete);

module.exports = router;
