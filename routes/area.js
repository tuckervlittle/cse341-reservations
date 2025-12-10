const express = require('express');
const router = express.Router();
const controller = require('../controllers/areaController');
const { isAuthenticated, isAdmin } = require('../middleware/authenticate');
//
//  AREAS: PUBLIC ACCESS (Resident + Admin)

// get all areas (club house, grill zone, sport court)
router.get('/',
// #swagger.tags = ['Areas']
// #swagger.description = 'Get all areas'
    controller.findAll);

// get area by ID
router.get('/:areaId', 
// #swagger.tags = ['Areas']
// #swagger.description = 'Get an area by ID'
    controller.findOne);

//   
//  AREAS — ADMIN ONLY

// create new area
router.post('/', 
    isAuthenticated, 
    isAdmin,// must be admin
    // #swagger.tags = ['Areas']
    // #swagger.description = 'Create an area'
    /* #swagger.parameters['Area'] = {
      in: 'body',
      description: 'Area to update',
      required: true,
      schema: { $ref: '#/definitions/UpdatedArea' }
  } */
    /* #swagger.responses[200] = {
        schema: [{ $ref: '#/definitions/UpdatedArea' }]
    } */
    controller.create);

// update area by name
router.put('/:name', 
    isAuthenticated,
    isAdmin,
    // #swagger.tags = ['Areas']
    // #swagger.description = 'Update an area by name'
    /* #swagger.parameters['UpdatedArea'] = {
      in: 'body',
      description: 'Area to create',
      required: true,
      schema: { $ref: '#/definitions/UpdatedArea' }
  } */
    /* #swagger.responses[200] = {
        description: 'List of areas',
        schema: [{ $ref: '#/definitions/UpdatedArea' }]
    } */
        controller.update)

// delete area by name
router.delete('/:name', 
    isAuthenticated,
    isAdmin,
    // #swagger.tags = ['Areas']
    // #swagger.description = 'Delete an area by name'
    controller.delete);

module.exports = router;

