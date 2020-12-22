const express = require('express');
const router = express.Router();

const cars = require('../controllers/cars');

const auth = require('../middleware/auth');

router.get('/', cars.getCars);

router.post('/create', cars.createCars);

module.exports = router;