const express = require('express');
const router = express.Router();

const cars = require('../controllers/cars');

router.get('/:id', cars.getCar);
router.use('/', cars.getCars);
router.post('/create', cars.createCar);
router.put('/:id', cars.modifyCar);
router.delete('/:id', cars.deleteCar);

module.exports = router;