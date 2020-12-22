const express = require('express');
const router = express.Router();

const cars = require('../controllers/cars');

router.get('/', cars.getCars);

router.post('/create', cars.createCars);

module.exports = router;