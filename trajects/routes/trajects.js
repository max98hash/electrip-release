const express = require('express');
const router = express.Router();

const cars = require('../controllers/trajects');

//const auth = require('../middleware/auth');

//router.get('/:id', cars.getCar);
router.get('/user/:userId', cars.getTrajects);
router.post('/create', cars.createTraject);
/*router.put('/:id', cars.modifyCar);
router.delete('/:id', cars.deleteCar);*/

module.exports = router;