const express = require('express');
const router = express.Router();

const cars = require('../controllers/cars');

const auth = require('../middleware/auth');

router.get('/:id', auth, cars.getCar);
router.post('/create', auth, cars.createCar);
//router.put('/:id', auth, cars.modifyCar);
router.delete('/:id', auth, cars.deleteCar);
router.get('/', auth, cars.getCars);

module.exports = router;