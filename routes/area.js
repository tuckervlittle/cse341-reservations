const express = require('express');
const router = express.Router();
const controller = require('../controllers/areaController');

// get all areas (club house, grill zone, sport court)
router.get('/', controller.findAll);

// create new area
router.post('/', controller.create);

// get area by ID
router.get('/:areaId', controller.findOne);

// delete area
router.delete('/:areaId', controller.delete);

module.exports = router;
